import AudioPlayer from './../components/AudioPlayer';
import { render } from 'react-dom';

class MyPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.renderElement();
  }

  renderElement() {
    render(
      <div>
        <h1>Player</h1>
        <AudioPlayer>
          <slot />
        </AudioPlayer>
        {/* , this.shadow */}
        {
          (this.shadowRoot.innerHTML = `<audio src="https://www.youtube.com/watch?v=mQbpuTeaMTs&ab_channel=FrancescoNinetyFour2" controls></audio>`)
        }
        {/* this.shadowRoot.innerHTML = `
        <audio
          src="https://www.youtube.com/watch?v=mQbpuTeaMTs&ab_channel=FrancescoNinetyFour2"
          controls
        ></audio>
        `; */}
      </div>
    );
  }
}

export default MyPlayer;

// import {render} from 'react-dom';
// import App from './App';

// class MyPlayer extends HTMLElement {

//   shadow;

//   constructor() {
//     // Always call super first in constructor
//     super();

//     this.shadow = this.attachShadow({mode: 'open'});
//     // Write element functionality in here
//     this.renderElement();
//   }

//   renderElement() {
//     const onClick = this.getAttribute('onclick')
//     const text = this.hasAttribute('text')
//       ? this.getAttribute('text')
//       : undefined;
//     render(<App text={text} onClick={onClick}><slot/></App>, this.shadow);
//   }

//   renderElement() {
//     // this.shadowRoot.innerHTML = `<audio src="https://www.youtube.com/watch?v=mQbpuTeaMTs&ab_channel=FrancescoNinetyFour2" controls></audio>`;
//     render(
//       <div>
//         <h1>Player</h1>
//         <AudioPlayer>
//           <slot />
//         </AudioPlayer>
//         , this.shadow
//       </div>
//     );
//   }
// }

// export default MyElement
