import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {
  // const [session, loading] = useSession();

  // function logoutHandler() {
  //   signOut();
  // }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>RW</div>
        </a>
      </Link>
      <nav>
        <ul>
          {/* {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )} */}
          {/* {session?.user.role === '621ec1e2b9068d5a5df7e85a' && ( */}
            <li>
              <Link href='/projects/orders'>OrderDrop</Link>
            </li>
            <li>
              <Link href='/projects/new'>New WB/DB Project</Link>
            </li>
            <li>
              <Link href='/projects/newSummit'>New Summit Project</Link>
            </li>
          )
          {/* } */}
          {/* {session?.user.role === '621ec1e2b9068d5a5df7e85a' && (
            <li>
              <Link href='/users'>User List</Link>
            </li>
          )} */}
          {/* {(session?.user.role === '621ec1e2b9068d5a5df7e85a' || session?.user.role === '621ec1f0b9068d5a5df7e85b') && (
            <li>
              <Link href='/backorders/table'>Backorder Table</Link>
            </li>
          )}
          {/* {session && ( */}
            <li>
              <Link href='/backorders'>Backorders</Link>
            </li>
          // )}
          {/* {(session?.user.role === '621ec1e2b9068d5a5df7e85a') && ( */}
            <li>
              <Link href='/backorders/new'>Add Backorder</Link>
            </li>
          {/* )} */}
          {/* {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )} */}
          {/* {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
