export const PRIORITY: PriorityProps[] = [
  {
    value: 'low',
    title: 'Low',
  },

  {
    value: 'normal',
    title: 'Normal',
  },

  {
    value: 'high',
    title: 'High',
  },
];
export interface PriorityProps {
  value: string;
  title: string;
}
export interface TaskProps {
  title: string;
  desc: string;
  date: string;
  priority: string;
}
