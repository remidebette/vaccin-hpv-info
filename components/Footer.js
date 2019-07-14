import React from 'react'

const Footer = () => (
  <footer>
    <p>
      La vaccination n’élimine pas totalement le risque de développer un cancer,
        donc elle ne dispense pas du dépistage,
        pensez à vous faire dépistez par frottis ou test-HPV à partir de 25 ans..
      <br />
        Parlez-en à votre médecin
    </p>
    <style jsx>{`
      footer {
        max-width: 700px;
        margin: 0 auto;
        color: #9A9A9A;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-style: italic;
        text-align: center;
      }
      footer p {
        border-top: 1px solid #DADADA;
        padding: 2rem 0;
        margin-bottom: 0;
      }
      footer a {
        font-weight: bold;
      }
      .footer-logo {
        width: 30px;
        margin-top: 10px;
      }
    `}</style>
  </footer>
)

export default Footer