const Landing = () => {
    return (
      <main>
        <h1>StudySync</h1>
        <h3>
          Plan your tasks, log study sessions, and track daily wellness in one place.
        </h3>
        <p>
        <Link to="/signin">Sign in</Link> or <Link to="/signup">create an account</Link> to get started.
        </p>
      </main>
    );
};
  
export default Landing;