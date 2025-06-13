import { useUser } from '@store';

export default function Home() {
  const { id, loading } = useUser();

  console.log({ id, loading });
  /*
  This is the main entry point for the application.
  There should be a provider for the app context
  Context should be containing the user data and other global state
  - If the user is null and never fetched, it should show a loading state
  - If the user is null and fetched, it should redirect to the login page
  - If the user is not null, user has multiple branches and user has not select any branche, it should redirect to the branches page
  - If the user is not null, active branch selected, it should redirect to the dashboard page
  */
  return null;
}
