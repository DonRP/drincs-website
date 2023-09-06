export interface GitHubCreateIssueBody {
    title?: string;
    body?: string;
    labels?: string[];
    milestone?: number;
    assignees?: string[];
}