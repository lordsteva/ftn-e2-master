import React, { FC } from 'react';

const CURRENT_TEXT_COLOR = 'text-blue-500 font-bold';

type BreadcrumbItem = { label: string; url: string };

type Props = {
  path: BreadcrumbItem[];
};

const Breadcrumb: FC<Props> = ({ path }) => {
  const pathLength = path.length;
  return (
    <nav className={`text-whitesmoke relative flex w-max bg-#131313 p-12`} aria-label="Breadcrumb">
      <ol role="list" className="flex px-10">
        {path.map((item, idx) => (
          <li key={idx} className="flex">
            <div className="flex items-center">
              <a
                href={item.url}
                className={`text-base font-sans hover:underline ${
                  pathLength === idx + 1 ? CURRENT_TEXT_COLOR : ''
                }`}
              >
                <span>{item.label}</span>
              </a>
            </div>
            {pathLength !== idx + 1 && <p className="p-2">{'>'}</p>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
