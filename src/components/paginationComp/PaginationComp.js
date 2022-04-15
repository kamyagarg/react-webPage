import React from 'react'

const PaginationComp = ({ postsPerPage, totalPosts, paginate, activePage }) => {

  // Page araay to display
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(num => {
          return (
            <li key={num} className={`page-item ${activePage === num ? 'active-page' : ''}`}>
              <a
                // href='!#'
                className='page-link'
                onClick={() => paginate(num)}
              >
                {num}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default PaginationComp;
