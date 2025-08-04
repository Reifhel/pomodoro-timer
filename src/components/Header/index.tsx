import { ScrollIcon, TimerIcon } from "@phosphor-icons/react";
import { HeaderContainer } from "./styles";

import { NavLink } from "react-router-dom";
import HourglassLogo from "../../assets/hourglass-logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <div>
        <img src={HourglassLogo} />
      </div>
      <nav>
        <NavLink to="/" title="Timer">
          <TimerIcon size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <ScrollIcon size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
