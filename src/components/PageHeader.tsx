import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface PageHeaderProps {
  /** Two-digit section marker, e.g. "03". */
  index: string;
  eyebrow: string;
  title: string;
  /** Optional right-aligned action, e.g. a "view GitHub" link. */
  action?: ReactNode;
}

export default function PageHeader({ index, eyebrow, title, action }: PageHeaderProps) {
  return (
    <Reveal>
      <div className="mb-14 flex flex-col gap-6 border-b border-terracotta pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-4">
            <span aria-hidden="true">{index}</span>
            <span className="sr-only">Section {index}</span>
            <span aria-hidden="true" className="mx-3 text-terracotta">
              /
            </span>
            {eyebrow}
          </p>
          <h1 className="page-title">{title}</h1>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
