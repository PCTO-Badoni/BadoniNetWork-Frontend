import React from "react";
import ReactDOM from "react-dom";
import * as Components from "./Components";
import "./styles.css";

function App() {
  const [signIn, toggle] = React.useState(true);
  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Azienda</Components.Title>
          <Components.Input type="text" placeholder="Ragione Sociale" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Telefono" />
          <Components.Input type="address" placeholder="Indirizzo" />
          <Components.Button>Richiedi Accesso</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Studente</Components.Title>
          <Components.Input type="name" placeholder="Nome" />
          <Components.Input type="surname" placeholder="Cognome" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Input type="passwordConf" placeholder="Conferma Password" />
          <Components.Button>Registrati</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Benvenuto!</Components.Title>
            <Components.Paragraph>
              Sei uno studente? Clicca qui sotto!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Studente
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Benvenuto!</Components.Title>
            <Components.Paragraph>
              Sei un'azienda? Clicca qui sotto!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Azienda
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
