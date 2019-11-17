import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getMenu} from "../utils/api";
import {Container, Divider, Segment, Rail, Grid, Card, Image, Icon, Form} from "semantic-ui-react";
import {layoutStyle} from "../utils/css";

const Index = (props) => {

    return (
        <Layout menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
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
                                Il a été créé en collaboration entre trois interne de médecine générale et leur
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

                            <h2>Contactez nous</h2>

                            <Form>
                                <Form.Input label='Adresse mail' placeholder='Adresse mail' />

                                <Form.Input fluid label='Sujet' placeholder='Sujet' />

                                <Form.TextArea label='Votre message' placeholder='Dites nous en plus...' rows={10}/>
                                <Form.Button size="large">Envoi</Form.Button>
                            </Form>
                            <Rail position='left'>
                                <Card>
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped
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
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' wrapped
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
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' wrapped
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
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped
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