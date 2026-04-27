export type ScriptItem = {
  id: string;
  category: string;
  customerType: string;
  situation: string;
  goal: string;
  strategy: string[];
  script: string;
  offer: string[];
  caution: string[];
};

export type CustomerType = {
  name: string;
  psychology: string;
  approach: string[];
  avoid: string[];
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
  active: boolean;
};

export type PolicyRule = {
  id: string;
  type: string;
  typeSpan?: number;
  hideType?: boolean;
  criteria: string;
  criteriaSpan?: number;
  hideCriteria?: boolean;
  condition: string;
  jisa: string;
  jiyeok: string;
  yeongup: string;
  marketing: string;
};

export type PolicyData = {
  targets: string[];
  note: string;
  important: string;
  rules: PolicyRule[];
  footerNotes: string[];
};

export type LogEntry = {
  id: string;
  timestamp: string;
  action: string;
  keyword?: string;
  scriptId?: string;
};

export type Interaction = {
  likes: number;
  comments: { id: string; text: string; date: string }[];
};

export type GlobalFeedback = {
  id: string;
  type: string;
  text: string;
  date: string;
};
