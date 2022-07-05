import './AuthenticationForm.scss';

const AuthenticationForm = (props) => {
  const handleSubmission = (event) => {
    event.preventDefault();
    props.onAuthenticationSubmit();
  };

  const handlePictureUpload = (event) => {
    // console.log('event.target.file 0', event.target.files[0]);
    // console.log('event.target.file 1', event.target.files[1]);
    // console.log('even.target.files', event.target.files);
    const imageFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(imageFile); // <-- new / result os a base64 encoded audio file / problem: creation does not work
    reader.onloadend = () => {
      props.onUserChange({ ...props.user, picture: reader.result });
    };

    props.onUserChange({ ...props.user, picture: event.target.value }); // <-- muss wieder gelöscht werden
  };

  const handleSoundUpload = (event) => {
    // console.log('event.target.file 0', event.target.files[0]);
    // console.log('event.target.file 1', event.target.files[1]);
    // console.log('even.target.files', event.target.files);
    const soundFile = event.target.files[0];

    console.log(event.target);
    const reader = new FileReader();
    reader.readAsDataURL(soundFile); // <-- new / result os a base64 encoded audio file / problem: creation does not work
    reader.onloadend = () => {
      props.onUserChange({ ...props.user, sound: reader.result });
      console.log(reader.result);
    };

    props.onUserChange({ ...props.user, sound: event.target.value }); // <-- has to be erased
  };

  return (
    <div className="authentication-form">
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
            <label htmlFor="input-picture">Upload Profile Picture</label>
            <label htmlFor="input-picture" className="custom-file-upload">
              <input
                id="input-picture"
                type="file"
                accept="image/*"
                // value={props.user.picture}
                onChange={handlePictureUpload}
              />
            </label>
          </>
        )}

        {props.displayInputs.includes('sound') && (
          <>
            <label htmlFor="input-sound">Upload Profile audio</label>
            <label htmlFor="input-picture" className="custom-file-upload">
              <input
                id="input-sound"
                type="file"
                accept="audio/*"
                // value={props.user.sound}
                onChange={
                  handleSoundUpload
                  // (event) =>
                  // props.onUserChange({ ...props.user, sound: event.target.value })
                }
              />
            </label>
          </>
        )}
        <div className="send-button">
          <button>{props.buttonLabel}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticationForm;
