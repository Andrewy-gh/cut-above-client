import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <main className="container-lg">
      <h1>Oops</h1>
      <p>
        Looks like you took a wrong turn. Click{' '}
        <Link to="/">
          <u>here</u>{' '}
        </Link>
        to return Home
      </p>
    </main>
  );
}
