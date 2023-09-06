export interface GitHubCreateIssueBody {
    title?: string;
    body?: string;
    label?: string[];
    milestone?: number;
}