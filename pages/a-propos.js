import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getMenu} from "../utils/api";
import {Container, Divider, Segment, Rail, Grid, Card, Image, Icon, Form, Message} from "semantic-ui-react";
import {layoutStyle} from "../utils/css";
import useForm from "../utils/useForm";
import Link from "next/link";

const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Index = (props) => {
    const initialState = {
        "mail": undefined,
        "subject": undefined,
        "message": undefined,
        "sent": false
    };
    const {values, handleChange, handleSubmit} = useForm(initialState, sendMail);

    const isProperMail = mailFormat.test(values.mail);
    const isProperSubject = values.subject !== "";
    const isProperMessage = values.message !== "";

    const isErrorMail = values.mail !== undefined && !isProperMail;
    const isErrorSubject = values.subject !== undefined && !isProperSubject;
    const isErrorMessage = values.message !== undefined && !isProperMessage;

    const isButtonActive = isProperMail && isProperSubject && isProperMessage;

    async function sendMail() {
        const link = "mailto:contact@vaccin-hpv-info.fr"
            + "?cc=" + values.mail
            + "&subject=" + encodeURIComponent(values.subject)
            + "&body=" + encodeURIComponent(values.message + "\n\n")
        ;

        window.location.href = link;

        handleChange(null, {name: "sent", value: true});
    }

    return (
        <Layout title="A propos de nous"
                description="Tout sur la vaccination anti-HPV.
                La création de ce site a été faite en collaboration entre trois internes de médecine générale
                et leur directeur de thèse."
                canonical="https://vaccin-hpv-info.fr/a-propos"
                menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
            <Grid centered columns={3}>
                <Grid.Column>
                    <Container
                        //text
                        className={layoutStyle}
                        textAlign='justified'
                    >
                        <h1>A propos de nous</h1>

                        <Divider hidden/>

                        <Segment basic>
                            <p>La création de ce site a pour but de donner une information claire, précise et simple sur
                                la
                                vaccination contre HPV.
                                Sa création et son évaluation ont fait l'objet d'un travail de thèse en médecine
                                général.
                                Il a été créé en collaboration entre trois internes de médecine générale et leur
                                directeur de
                                thèse.</p>

                            <p>
                                Les références proviennent des recommandations nationales, de sociétés savantes ou
                                fédérations, de
                                méta-analyses et d’articles disponibles dans les différents liens.
                            </p>
                            <p>
                                Vaccin-HPV-Info a été élaboré en collaboration par :
                                BENCHEKROUN Mehdi, DESMARECAUX Céline, DUBOIS Lucas et FAVRE Jonathan
                            </p>
                            <p>
                                Financement :
                                Le projet est auto-financé.
                                Le site n’accueille aucune forme de publicité.
                                Les auteurs n’ont pas de conflit d’intérêt.
                            </p>

                            <Divider/>

                            <h2>Contactez nous</h2>
                            <p>
                                Vous pouvez nous contacter directement par mail à &nbsp;
                                <a href="mailto:contact@vaccin-hpv-info.fr"><Icon fitted name='mail'/>contact@vaccin-hpv-info.fr</a>
                                &nbsp;ou à l'aide du formulaire ci-dessous qui ouvrira le client mail de votre appareil.
                            </p>

                            {!values.sent && <Form>
                                {/*                                <Form.Input label='Votre nom et prénom' placeholder='Votre nom'
                                            name='name' value={values.name}
                                            error={isErrorName} onChange={handleChange}/>*/}
                                <Form.Input label='Adresse mail' placeholder='Adresse mail'
                                            name='mail' value={values.mail}
                                            error={isErrorMail} onChange={handleChange}/>

                                <Form.Input fluid label='Sujet' placeholder='Sujet'
                                            name="subject" value={values.subject}
                                            error={isErrorSubject} onChange={handleChange}/>

                                <Form.TextArea label='Votre message'
                                               placeholder='Dites nous en plus...'
                                               rows={10}
                                               name="message" value={values.message}
                                               error={isErrorMessage} onChange={handleChange}
                                />

                                <Form.Button size="large" disabled={!isButtonActive}
                                             onClick={handleSubmit}>Envoi</Form.Button>
                            </Form>}


                            {values.sent && <>
                                <Message>
                                    <Message.Header>Nous avons ouvert votre éditeur de mail !</Message.Header>
                                    <p>
                                        Pensez à vérifiez vos mails pour notre réponse.
                                    </p>
                                </Message>

                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                                <Divider hidden/>
                            </>}


                            <Rail position='left'>
                                <Card>
                                    <Image src='/static/images/benchekroun.jpg' wrapped
                                           ui={false}/>
                                    <Card.Content>
                                        <Card.Header>BENCHEKROUN Mehdi</Card.Header>
                                        <Card.Description>
                                            Interne en médecine générale
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='hospital'/>
                                            Faculté de médecine de Lille
                                        </a>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Image src='/static/images/desmarecaux.jpg' wrapped
                                           ui={false}/>
                                    <Card.Content>
                                        <Card.Header>DESMARECAUX Céline</Card.Header>
                                        <Card.Description>
                                            Interne en médecine générale
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='hospital'/>
                                            Faculté de médecine de Lille
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Rail>

                            <Rail position='right'>
                                <Card>
                                    <Image src='/static/images/favre.jpg' wrapped
                                           ui={false}/>
                                    <Card.Content>
                                        <Card.Header>FAVRE Jonathan</Card.Header>
                                        <Card.Description>
                                            Chef de clinique des universités
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='hospital'/>
                                            Faculté de médecine de Lille
                                        </a>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Image src='/static/images/dubois.jpg' wrapped
                                           ui={false}/>
                                    <Card.Content>
                                        <Card.Header>DUBOIS Lucas</Card.Header>
                                        <Card.Description>
                                            Interne en médecine générale
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='hospital'/>
                                            Faculté de médecine de Lille
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Rail>
                        </Segment>

                    </Container>
                </Grid.Column>
            </Grid>
        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        ...menu
    }
}


export default Index