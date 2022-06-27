const AuthenticationForm = (props) => {
  const handleSubmission = (event) => {
    event.preventDefault();
    props.onAuthenticationSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmission} encType="multipart/form-data">
        {props.displayInputs.includes('name') && (
          <>
            <label htmlFor="input-name">Name</label>
            <input
              id="input-name"
              type="text"
              placeholder="Name"
              value={props.user.name}
              onChange={(event) =>
                props.onUserChange({ ...props.user, name: event.target.value })
              }
            />
          </>
        )}

        {props.displayInputs.includes('email') && (
          <>
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              type="email"
              placeholder="Email"
              value={props.user.email}
              onChange={(event) =>
                props.onUserChange({ ...props.user, email: event.target.value })
              }
            />
          </>
        )}

        {props.displayInputs.includes('password') && (
          <>
            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              type="password"
              placeholder="Password"
              value={props.user.password}
              onChange={(event) =>
                props.onUserChange({
                  ...props.user,
                  password: event.target.value
                })
              }
            />
          </>
        )}

        {props.displayInputs.includes('description') && (
          <>
            <label htmlFor="input-description">Description</label>
            <input
              id="input-description"
              type="text"
              placeholder="Add a description"
              value={props.user.description}
              onChange={(event) =>
                props.onUserChange({
                  ...props.user,
                  description: event.target.value
                })
              }
            />
          </>
        )}

        {props.displayInputs.includes('picture') && (
          <>
            <label htmlFor="input-picture">Profile picture</label>
            <input
              id="input-picture"
              type="file"
              accept="image/*"
              value={props.user.picture}
              onChange={(event) =>
                props.onUserChange({
                  ...props.user,
                  picture: event.target.value
                })
              }
            />
          </>
        )}

        {props.displayInputs.includes('sound') && (
          <>
            <label htmlFor="input-sound">Profile audio</label>
            <input
              id="input-sound"
              type="file"
              accept="audio/*"
              value={props.user.sound}
              onChange={(event) =>
                props.onUserChange({ ...props.user, sound: event.target.value })
              }
            />
          </>
        )}

        <button>{props.buttonLabel}</button>
      </form>
    </div>
  );
};

export default AuthenticationForm;
