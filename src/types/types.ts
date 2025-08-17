export interface ShortenedLink {
  url: string;
  shortCode: string;
}

export interface AnalyticsData {
  id: number;
  originalUrl: string;
  shortCode: string;
  hits: number;
  createdAt: Date;
  updatedAt: Date;
}