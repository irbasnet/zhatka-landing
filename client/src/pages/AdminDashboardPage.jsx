import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminMe, adminLogout, getAdminFeedback } from '../api/client';

const RATING_OPTIONS = [1, 2, 3, 4, 5];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortDir, setSortDir] = useState('desc');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [ratingMin, setRatingMin] = useState('');
  const [ratingMax, setRatingMax] = useState('');

  useEffect(() => {
    adminMe().then((ok) => {
      if (!ok) navigate('/admin/login');
      else setCheckingAuth(false);
    });
  }, [navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAdminFeedback({ page, pageSize, sortDir, dateFrom, dateTo, ratingMin, ratingMax });
      setItems(data.items);
      setTotalCount(data.totalCount);
    } catch (err) {
      if (err.status === 401) {
        navigate('/admin/login');
        return;
      }
      setError('Failed to load feedback.');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortDir, dateFrom, dateTo, ratingMin, ratingMax, navigate]);

  useEffect(() => {
    if (!checkingAuth) load();
  }, [checkingAuth, load]);

  function toggleSort() {
    setPage(1);
    setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
  }

  async function handleLogout() {
    await adminLogout();
    navigate('/admin/login');
  }

  function clearFilters() {
    setPage(1);
    setDateFrom('');
    setDateTo('');
    setRatingMin('');
    setRatingMax('');
  }

  if (checkingAuth) return null;

  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <img className="admin-logo" src="/assets/zhatka-logo.svg" alt="Zhatka" />
        <h1>Feedback</h1>
        <button type="button" className="admin-logout" onClick={handleLogout}>Log out</button>
      </div>

      <div className="admin-filters">
        <label>
          From
          <input type="date" value={dateFrom} onChange={(e) => { setPage(1); setDateFrom(e.target.value); }} />
        </label>
        <label>
          To
          <input type="date" value={dateTo} onChange={(e) => { setPage(1); setDateTo(e.target.value); }} />
        </label>
        <label>
          Min rating
          <select value={ratingMin} onChange={(e) => { setPage(1); setRatingMin(e.target.value); }}>
            <option value="">Any</option>
            {RATING_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label>
          Max rating
          <select value={ratingMax} onChange={(e) => { setPage(1); setRatingMax(e.target.value); }}>
            <option value="">Any</option>
            {RATING_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <button type="button" className="admin-clear" onClick={clearFilters}>Clear filters</button>
      </div>

      {error && <p className="feedback-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>
                <button type="button" className="admin-sort" onClick={toggleSort}>
                  Date {sortDir === 'desc' ? '↓' : '↑'}
                </button>
              </th>
              <th>Rating</th>
              <th>Product</th>
              <th>Comment</th>
              <th>Submitted by</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.length === 0 && (
              <tr><td colSpan={5} className="admin-empty">No feedback found.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.createdAtUtc).toLocaleString()}</td>
                <td>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</td>
                <td>{item.product ?? '—'}</td>
                <td className="admin-comment">{item.comment ?? '—'}</td>
                <td>{item.isAnonymous ? 'Anonymous' : [item.name, item.contact].filter(Boolean).join(' · ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <label>
          Per page
          <select value={pageSize} onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)); }}>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
        <span className="admin-range">{rangeStart}–{rangeEnd} of {totalCount}</span>
        <div className="admin-page-btns">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
