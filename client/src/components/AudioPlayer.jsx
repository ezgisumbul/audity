// {
//   class AudioPlayer extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//     }

//     render() {
//       this.shadowRoot.innerHTML = `<audio src="https://www.youtube.com/watch?v=mQbpuTeaMTs&ab_channel=FrancescoNinetyFour2" controls></audio>`;
//       this.render();
//     }
//   }

//   customElements.define('audio-player', AudioPlayer);
// }

const AudioPlayer = ({ children }) => {
  return (
    <div>
      <h1>AudioPlayer</h1>
      <my-player />
      {children}
    </div>
  );
};

export default AudioPlayer;
