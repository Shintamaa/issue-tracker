import { Bug, BookOpen, SquarePen, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import {
    Plus,
    CalendarDays,
    RefreshCw,
    Settings,
    MoreHorizontal,
    Pencil,
    Trash2,
    X,
} from "lucide-react";
import toast from "react-hot-toast";
import "../styles/ProjectBoard.css";

const initialIssues = [
    {
        id: 1,
        title: "Fix login page responsive design",
        description: "Fix login page responsive design",
        type: "Bug",
        priority: "Low",
        assignee: "Naila",
        status: "To Do",
        dueDate: "05 Nov 2026",
        labels: "UI",
        sprint: "Sprint 1",
        points: 3,
    },
    {
        id: 2,
        title: "Implement user authentication system",
        description: "Implement user authentication system",
        type: "Story",
        priority: "High",
        assignee: "Andi",
        status: "In Progress",
        dueDate: "06 Nov 2026",
        labels: "Backend",
        sprint: "Sprint 1",
        points: 8,
    },
    {
        id: 3,
        title: "Setup project repository and CI/CD...",
        description: "Setup project repository and CI/CD pipeline.",
        type: "Task",
        priority: "High",
        assignee: "Budi",
        status: "Done",
        dueDate: "01 Nov 2026",
        labels: "DevOps",
        sprint: "Sprint 1",
        points: 5,
    },
    {
        id: 4,
        title: "Membuat struktur project",
        description: "Menyiapkan struktur folder frontend.",
        type: "Task",
        priority: "Medium",
        assignee: "Naila",
        status: "In Review",
        dueDate: "07 Nov 2026",
        labels: "Frontend",
        sprint: "Sprint 1",
        points: 3,
    },
];

const columns = [
    { title: "To Do", color: "#8794df" },
    { title: "In Progress", color: "#e5a54b" },
    { title: "In Review", color: "#8b78d6" },
    { title: "Done", color: "#55ad82" },
];

const emptyForm = {
    title: "",
    description: "",
    type: "Task",
    priority: "Medium",
    assignee: "",
    status: "To Do",
    dueDate: "",
    labels: "",
    sprint: "Sprint 1",
    points: 3,
};

function toInputDate(dateText) {
    if (!dateText || dateText === "-") return "";
    const knownDate = new Date(dateText);
    if (Number.isNaN(knownDate.getTime())) return "";
    const localDate = new Date(
        knownDate.getTime() - knownDate.getTimezoneOffset() * 60000,
    );
    return localDate.toISOString().slice(0, 10);
}

function displayDate(dateText) {
    if (!dateText) return "-";
    const date = new Date(`${dateText}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateText;
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function getPriorityClass(priority) {
    const normalized = String(priority || "Medium").toLowerCase();
    return ["high", "medium", "low", "urgent"].includes(normalized)
        ? normalized
        : "medium";
}

export default function ProjectBoard() {
    const [issues, setIssues] = useState(initialIssues);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingIssueId, setEditingIssueId] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [draggedIssueId, setDraggedIssueId] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });

    const filteredIssues = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return issues;
        return issues.filter((issue) =>
            [
                issue.title,
                issue.description,
                issue.assignee,
                issue.type,
                issue.priority,
                issue.labels,
            ].some((value) =>
                String(value || "")
                    .toLowerCase()
                    .includes(keyword),
            ),
        );
    }, [issues, search]);

    const getCount = (status) =>
        issues.filter((issue) => issue.status === status).length;

    const openCreateForm = () => {
        setEditingIssueId(null);
        setForm({ ...emptyForm });
        setActiveMenuId(null);
        setShowForm(true);
    };

    const openEditForm = (issue) => {
        setEditingIssueId(issue.id);
        setForm({
            ...emptyForm,
            ...issue,
            dueDate: toInputDate(issue.dueDate),
        });
        setActiveMenuId(null);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingIssueId(null);
        setForm({ ...emptyForm });
    };

    const handleSaveIssue = (event) => {
        event.preventDefault();

        const savedIssue = {
            ...form,
            id: editingIssueId ?? Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            assignee: form.assignee.trim() || "Unassigned",
            dueDate: displayDate(form.dueDate),
            points: Number(form.points) || 0,
            priority: ["High", "Medium", "Low", "Urgent"].includes(
                form.priority,
            )
                ? form.priority
                : "Medium",
        };

        if (editingIssueId !== null) {
            setIssues((current) =>
                current.map((issue) =>
                    issue.id === editingIssueId ? savedIssue : issue,
                ),
            );
            toast.success("Issue berhasil diperbarui!");
        } else {
            setIssues((current) => [...current, savedIssue]);
            toast.success("Issue berhasil ditambahkan!");
        }
        closeForm();
    };

    const handleDeleteIssue = (issue) => {
        if (!window.confirm(`Hapus issue "${issue.title}"?`)) return;
        setIssues((current) => current.filter((item) => item.id !== issue.id));
        setActiveMenuId(null);
        toast.success("Issue berhasil dihapus.");
    };

    const moveIssue = (issueId, newStatus) => {
        setIssues((current) =>
            current.map((issue) =>
                issue.id === issueId ? { ...issue, status: newStatus } : issue,
            ),
        );
        setDraggedIssueId(null);
        toast.success(`Issue dipindahkan ke ${newStatus}.`);
    };

    const handleDrop = (event, status) => {
        event.preventDefault();
        const id =
            Number(event.dataTransfer.getData("text/plain")) || draggedIssueId;
        if (id === null || id === undefined) return;
        const issue = issues.find((item) => item.id === id);
        if (issue && issue.status !== status) moveIssue(id, status);
    };

    return (
        <section className="board-container">
            <div className="board-heading">
                <div>
                    <h2>Project Board</h2>
                    <p>Manage your project issues and track progress</p>
                </div>
                <div className="board-actions">
                    <button
                        type="button"
                        className="refresh-button"
                        onClick={() => {
                            setSearch("");
                            toast.success("Project Board diperbarui.");
                        }}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                    <button
                        type="button"
                        className="create-issue-button"
                        onClick={openCreateForm}
                    >
                        <Plus size={17} />
                        Create Issue
                    </button>
                    <button
                        type="button"
                        className="settings-button"
                        aria-label="Board settings"
                        onClick={() =>
                            toast("Pengaturan board akan ditambahkan nanti.")
                        }
                    >
                        <Settings size={19} />
                    </button>
                </div>
            </div>

            <div className="board-summary">
                {columns.map((column, index) => (
                    <div
                        className={`summary-card ${index === 0 ? "summary-card-primary" : ""}`}
                        key={column.title}
                    >
                        <p>{column.title}</p>
                        <h3>{getCount(column.title)}</h3>
                        <small>
                            {column.title === "To Do"
                                ? "Tasks waiting to be started"
                                : column.title === "In Progress"
                                  ? "Tasks currently in progress"
                                  : column.title === "In Review"
                                    ? "Tasks waiting for review"
                                    : "Completed tasks"}
                        </small>
                    </div>
                ))}
            </div>

            <div className="kanban-board">
                {columns.map((column) => {
                    const columnIssues = filteredIssues.filter(
                        (issue) => issue.status === column.title,
                    );

                    return (
                        <div
                            className={`kanban-column ${draggedIssueId ? "kanban-column-drop-ready" : ""}`}
                            key={column.title}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => handleDrop(event, column.title)}
                        >
                            <div className="issue-list">
                                {columnIssues.map((issue) => {
                                    const priority = getPriorityClass(
                                        issue.priority,
                                    );
                                    return (
                                        <article
                                            className={`issue-card priority-border-${priority}`}
                                            key={issue.id}
                                            draggable
                                            onDragStart={(event) => {
                                                setDraggedIssueId(issue.id);
                                                event.dataTransfer.setData(
                                                    "text/plain",
                                                    String(issue.id),
                                                );
                                                event.dataTransfer.effectAllowed =
                                                    "move";
                                            }}
                                            onDragEnd={() =>
                                                setDraggedIssueId(null)
                                            }
                                        >
                                            <div className="issue-card-top">
                                                <span
                                                    className={`issue-type-icon type-${issue.type.toLowerCase().replace(/\s+/g, "-")}`}
                                                >
                                                    {issue.type === "Bug" ? (
                                                        <Bug size={28} />
                                                    ) : issue.type ===
                                                      "Story" ? (
                                                        <BookOpen size={28} />
                                                    ) : issue.type ===
                                                      "Feature" ? (
                                                        <Sparkles size={28} />
                                                    ) : (
                                                        <SquarePen size={28} />
                                                    )}
                                                </span>

                                                <span className="issue-type-label">
                                                    {issue.type}
                                                </span>

                                                <div className="issue-menu-wrapper">
                                                    <button
                                                        type="button"
                                                        className="issue-menu-button"
                                                        aria-label={`Actions for ${issue.title}`}
                                                        aria-expanded={
                                                            activeMenuId ===
                                                            issue.id
                                                        }
                                                        onClick={() =>
                                                            setActiveMenuId(
                                                                activeMenuId ===
                                                                    issue.id
                                                                    ? null
                                                                    : issue.id,
                                                            )
                                                        }
                                                    >
                                                        <MoreHorizontal
                                                            size={19}
                                                        />
                                                    </button>

                                                    {activeMenuId ===
                                                        issue.id && (
                                                        <div
                                                            className="issue-action-menu"
                                                            onClick={(event) =>
                                                                event.stopPropagation()
                                                            }
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEditForm(
                                                                        issue,
                                                                    )
                                                                }
                                                            >
                                                                <Pencil
                                                                    size={14}
                                                                />
                                                                Edit Issue
                                                            </button>
                                                            <label
                                                                className="menu-status-label"
                                                                htmlFor={`status-${issue.id}`}
                                                            >
                                                                Change Status
                                                            </label>
                                                            <select
                                                                id={`status-${issue.id}`}
                                                                value={
                                                                    issue.status
                                                                }
                                                                onChange={(
                                                                    event,
                                                                ) => {
                                                                    moveIssue(
                                                                        issue.id,
                                                                        event
                                                                            .target
                                                                            .value,
                                                                    );
                                                                    setActiveMenuId(
                                                                        null,
                                                                    );
                                                                }}
                                                            >
                                                                {columns.map(
                                                                    (item) => (
                                                                        <option
                                                                            key={
                                                                                item.title
                                                                            }
                                                                            value={
                                                                                item.title
                                                                            }
                                                                        >
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                            <button
                                                                type="button"
                                                                className="delete-action"
                                                                onClick={() =>
                                                                    handleDeleteIssue(
                                                                        issue,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={14}
                                                                />
                                                                Delete Issue
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <h4>{issue.title}</h4>
                                            {issue.description &&
                                                issue.description !==
                                                    issue.title && (
                                                    <p className="issue-description">
                                                        {issue.description}
                                                    </p>
                                                )}

                                            <div className="issue-card-meta">
                                                {issue.sprint && (
                                                    <span className="sprint-badge">
                                                        {issue.sprint}
                                                    </span>
                                                )}
                                                <span className="points-badge">
                                                    {issue.points} pts
                                                </span>
                                                {issue.labels && (
                                                    <span className="label-badge">
                                                        {issue.labels}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="issue-card-footer">
                                                <div
                                                    className="issue-assignee"
                                                    title={issue.assignee}
                                                >
                                                    <span className="assignee-avatar">
                                                        {(issue.assignee || "U")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                    <span className="assignee-name">
                                                        {issue.assignee ||
                                                            "Unassigned"}
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}

                                {columnIssues.length === 0 && (
                                    <div className="empty-column">
                                        No issues
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {showForm && (
                <div className="issue-modal-overlay" onClick={closeForm}>
                    <form
                        className="issue-modal"
                        onSubmit={handleSaveIssue}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="issue-modal-header">
                            <div>
                                <h2>
                                    {editingIssueId !== null
                                        ? "Edit Issue"
                                        : "Create Issue"}
                                </h2>
                                <p>
                                    {editingIssueId !== null
                                        ? "Update issue details and save your changes."
                                        : "Create a new issue to track work and collaborate with your team."}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="modal-close-button"
                                onClick={closeForm}
                                aria-label="Close form"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="issue-modal-body">
                            <div className="form-field full-width">
                                <label htmlFor="issue-title">
                                    Title <span className="required">*</span>
                                </label>
                                <input
                                    id="issue-title"
                                    type="text"
                                    required
                                    autoFocus
                                    value={form.title}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            title: event.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-field full-width">
                                <label htmlFor="issue-description">
                                    Description
                                </label>
                                <textarea
                                    id="issue-description"
                                    maxLength={200}
                                    value={form.description}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            description: event.target.value,
                                        })
                                    }
                                />
                                <small className="character-count">
                                    {form.description.length}/200
                                </small>
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-type">
                                    Issue Type{" "}
                                    <span className="required">*</span>
                                </label>
                                <select
                                    id="issue-type"
                                    required
                                    value={form.type}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            type: event.target.value,
                                        })
                                    }
                                >
                                    <option value="Task">Task</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Story">Story</option>
                                    <option value="Feature">Feature</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-assignee">Assignee</label>
                                <select
                                    id="issue-assignee"
                                    value={form.assignee}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            assignee: event.target.value,
                                        })
                                    }
                                >
                                    <option value="">Unassigned</option>
                                    <option value="Jane Doe">Jane Doe</option>
                                    <option value="Naila">Naila</option>
                                    <option value="Andi">Andi</option>
                                    <option value="Budi">Budi</option>
                                    <option value="Siti">Siti</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-priority">
                                    Priority <span className="required">*</span>
                                </label>
                                <select
                                    id="issue-priority"
                                    required
                                    value={form.priority}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            priority: event.target.value,
                                        })
                                    }
                                >
                                    <option value="Urgent">Urgent</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-labels">Labels</label>
                                <input
                                    id="issue-labels"
                                    type="text"
                                    value={form.labels || ""}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            labels: event.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-sprint">Sprint</label>
                                <select
                                    id="issue-sprint"
                                    value={form.sprint || ""}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            sprint: event.target.value,
                                        })
                                    }
                                >
                                    <option value="">No Sprint</option>
                                    <option value="Sprint 1">Sprint 1</option>
                                    <option value="Sprint 2">Sprint 2</option>
                                    <option value="Sprint 3">Sprint 3</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-points">
                                    Story Points
                                </label>
                                <input
                                    id="issue-points"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={form.points}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            points: event.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="issue-status">Status</label>
                                <select
                                    id="issue-status"
                                    value={form.status}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            status: event.target.value,
                                        })
                                    }
                                >
                                    {columns.map((column) => (
                                        <option
                                            key={column.title}
                                            value={column.title}
                                        >
                                            {column.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="issue-modal-footer">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={closeForm}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-issue-button"
                            >
                                {editingIssueId !== null
                                    ? "Save Changes"
                                    : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}
