// Filename - components/Footer.js

import React from "react";
import {
  Box,
  FooterContainer,
  Row,
  Column,
  FooterLink,
  Heading,
  FooterText,
  FooterIcon,
} from "./FooterComponents";

import "primeicons/primeicons.css";

const Footer = () => {
  return (
    <Box>
      <FooterContainer>
        <Row>
          <Column>
            <Heading>Chi siamo</Heading>
            <div>
              <FooterIcon className="pi pi-graduation-cap"></FooterIcon>
              <FooterLink href="https://iisbadoni.edu.it/">
                La scuola
              </FooterLink>
            </div>
            <div>
              <FooterIcon className="pi pi-github"></FooterIcon>
              <FooterLink href="https://github</div>.com/PCTO-Badoni">
                I creatori
              </FooterLink>
            </div>
          </Column>
          <Column>
            <Heading>Contattaci</Heading>
            <div>
              <FooterIcon className="pi pi-envelope"></FooterIcon>
              <FooterLink href="mailto:portalebadoni@gmail.com">
                Email
              </FooterLink>
            </div>
            <div>
              <FooterIcon className="pi pi-phone"></FooterIcon>
              <FooterText>0341 365339</FooterText>
            </div>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <div>
              <FooterIcon className="pi pi-facebook"></FooterIcon>
              <FooterLink href="https://www.facebook.com/p/IIS-Badoni-100064149750387/">
                Facebook
              </FooterLink>
            </div>
            <div>
              <FooterIcon className="pi pi-instagram"></FooterIcon>
              <FooterLink href="https://www.instagram.com/iisbadoni/">
                Instagram
              </FooterLink>
            </div>
            <div>
              <FooterIcon className="pi pi-youtube"></FooterIcon>
              <FooterLink href="https://www.youtube.com/@istitutobadoni-lecco3424/featured">
                Youtube
              </FooterLink>
            </div>
          </Column>
          <Column>
            <Heading>Privacy</Heading>
            <div>
              <FooterIcon className="pi pi-lock"></FooterIcon>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </div>
          </Column>
        </Row>
      </FooterContainer>
    </Box>
  );
};
export default Footer;
