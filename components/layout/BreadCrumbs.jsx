import Link from "next/link";
import React from "react";

const BreadCrumbs = ({ breadCrumps }) => {
  return (
    <section className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {
            breadCrumps?.map((b, idx) => (
              <li className="inline-flex items-center" key={idx}>
                <Link href={b?.link} className="text-gray-600 hover:text-blue-600">
                  {b?.name}
                </Link>
                {
                  breadCrumps?.length - 1 !== idx && (
                    <i className="ml-3 text-gray-400 fa fa-chevron-right"></i>
                  )
                }
              </li>
            ))
          }
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
