import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {apiEndpoint, accessToken} from 'prismic-configuration'
import {
    Header,
    Transition,
    Divider,
    Segment,
    Button,
    Message, Icon
} from 'semantic-ui-react'
import useForm from "utils/useForm";
import {getMenu} from "../utils/api";


const messages = {
    "under_15": {
        0: "Tu peux débuter la vaccination dès que possible avec une dose de Gardasil 9.\n" +
            "Une deuxième dose te sera administrée 6 à 13 mois plus tard.\n" +
            "\n" +
            "Ce vaccin peut être administré en même temps que le rappel diphtérie-tétanos-coqueluche-poliomyélite ou avec un vaccin contre l’hépatite B, ainsi qu’avec le vaccin contre le méningocoque de sérogroupe C.\n",
        1: "Tu as déjà reçu une première dose de vaccin.\n" +
            "\n" +
            "La vaccination sera complétée par une deuxième dose du vaccin, le même que celui qui a été utilisé pour la 1ère dose, 6mois plus tard.\n" +
            "Si tu es en retard pour la 2e dose, il est quand même conseillé de te rendre chez ton médecin pour compléter la vaccination.\n" +
            "\n" +
            "Ce vaccin peut être administré en même temps que le rappel diphtérie-tétanos-coqueluche-poliomyélite ou avec un vaccin contre l’hépatite B, ainsi qu’avec le vaccin contre le méningocoque de sérogroupe C.\n",
        2: "Tu as reçu deux doses du vaccin contre le papillomavirus.\n" +
            "Félicitation Ta vaccination est complète.\n"
    },
    "under_20": {
        0: "Tu peux débuter la vaccination dès que possible avec une dose de Gardasil 9.\n" +
            "Une deuxième dose te sera administrée 2 mois plus tard et la 3e dose 6 mois plus tard.\n" +
            "\n" +
            "La vaccination peut être débutée même si tu as déjà eu des rapports sexuels, néanmoins elle peut s’avérer moins efficace si tu as déjà été en contact avec certains papillomavirus au cours de relations sexuelles.\n" +
            "Nous te rappelons que la vaccination anti HPV, ne protège pas des autres infections sexuellement transmissibles. Le port du préservatif reste indispensable.\n" +
            "De plus le dépistage du cancer du col de l’utérus est recommandé à partir de 25 ans, tous les 3 ans, même si tu es vaccinée.\n",
        1: "Tu as déjà reçu une première dose de vaccin.\n" +
            "La vaccination sera complétée par une deuxième et troisième dose du vaccin, le même que celui qui a été utilisé pour la 1ère dose :\n" +
            "Cervarix : 2e dose à 1 mois, 3e dose à 6 mois \n" +
            "Gardasil : 2e dose à 2 mois, 3e dose à 6 mois\n" +
            "Gardasil 9 : 2e dose à 2 mois, 3e dose à 6 mois \n" +
            "Si tu es en retard pour la 2e dose, il est quand même conseillé de te rendre chez ton médecin pour compléter la vaccination.\n" +
            "La vaccination peut être poursuivie même si tu as déjà eu des rapports sexuels, néanmoins elle peut s’avérer moins efficace si tu as déjà été en contact avec certains papillomavirus au cours de relations sexuelles.\n" +
            "Nous te rappelons que la vaccination anti HPV, ne protège pas des autres infections sexuellement transmissibles. Le port du préservatif reste indispensable.\n" +
            "De plus le dépistage du cancer du col de l’utérus est recommandé à partir de 25 ans, tous les 3 ans, même si tu es vaccinée.\n",
        2: "Tu as reçu deux doses du vaccin contre le papillomavirus.\n" +
            "La vaccination sera complétée par une troisième dose du vaccin, le même que celui qui a été utilisé pour les premières doses :\n" +
            "Cervarix : 3e dose 6 mois après la première\n" +
            "Gardasil : 3e dose 6 mois après la première\n" +
            "Gardasil 9 : 3e dose 6 mois après la première\n" +
            "Si tu es en retard pour la 3e dose, il est quand même conseillé de te rendre chez ton médecin pour compléter la vaccination.\n" +
            "La vaccination peut être poursuivie même si tu as déjà eu des rapports sexuels, néanmoins elle peut s’avérer moins efficace si tu as déjà été en contact avec certains papillomavirus au cours de relations sexuelles.\n" +
            "Nous te rappelons que la vaccination anti HPV, ne protège pas des autres infections sexuellement transmissibles. Le port du préservatif reste indispensable.\n" +
            "De plus le dépistage du cancer du col de l’utérus est recommandé à partir de 25 ans, tous les 3 ans, même si tu es vaccinée.\n",
        3: "Tu as reçu trois doses du vaccin contre le papillomavirus.\n" +
            "Félicitation Ta vaccination est complète.\n" +
            "Nous te rappelons que la vaccination anti HPV, ne protège pas des autres infections sexuellement transmissibles. Le port du préservatif reste indispensable.\n" +
            "De plus le dépistage du cancer du col de l’utérus est recommandé à partir de 25 ans, tous les 3 ans, même si tu es vaccinée.\n"
    }
}

const EtVous = (props) => {
    const initialState = {
        "gender": "",
        "age_band": "",
        "doses": ""
    };

    const {values, handleChange, handleSubmit} = useForm(initialState, null);

    return (
        <Layout menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
            <Header as="h1">Et vous ?</Header>
            <Segment basic textAlign='center'>
                <label> Vous êtes: </label>
                <Button.Group inline>
                    <Button
                        positive={values.gender === "female"}
                        value="female"
                        name="gender"
                        onClick={handleChange}
                    ><Icon name="female"/> Une fille</Button>
                    <Button.Or text="ou"/>
                    <Button
                        positive={values.gender === "male"}
                        value="male"
                        name="gender"
                        onClick={handleChange}
                    ><Icon name="male"/> Un garçon
                    </Button>
                    <Button.Or text="ou"/>
                    <Button
                        positive={values.gender === "parent"}
                        value="parent"
                        name="gender"
                        onClick={handleChange}
                    ><Icon name="user secret"/> Parents</Button>
                </Button.Group>
                {/*                    <Form.Radio label='Un garçon' checked={gender === "male"} value="male" onChange={handleChange}/>
                    <Form.Radio label='Une fille' checked={gender === "female"} value="female" onChange={handleChange}/>
                    <Form.Radio label="Parent d'une fille" checked={gender === "parent"} value="parent" onChange={handleChange}/>*/}

                <Transition visible={values.gender === "male"} animation='scale' duration={500}>
                    <Message
                        error
                        header='Attention'
                        visible={values.gender === "male"}
                    >La vaccination n’est pas recommandée actuellement pour les Garçons.
                        <br/>

                        Pour les <strong>hommes ayant des relations sexuelles avec des hommes </strong>, la vaccination
                        HPV par Gardasil® ou Gardasil 9® est recommandée jusqu’à l’âge de 26 ans, en prévention des
                        lésions précancéreuses anales, des cancers anaux et des condylomes, avec 3 doses de vaccin (la
                        2e à 2 mois, la 3e à 6 mois).

                        <br/>
                        Vous pouvez vous rapprocher de votre médecin traitant, ou vous rendre dans les CeGIDD et dans
                        certains centres publics de vaccination proches de chez vous.
                    </Message>
                </Transition>

                <Transition visible={["female", "parent"].includes(values.gender)} animation='scale'
                            duration={500}>
                    <div>
                        <Divider hidden/>
                        <label>{values.gender === "female" ? "Vous avez:" : "Votre fille a:"} </label>
                        <Button.Group>
                            <Button positive={values.age_band === "under_11"} value="under_11" name="age_band"
                                    onClick={handleChange}><Icon name="child" size="small"/>Moins de 11 ans</Button>
                            <Button positive={values.age_band === "under_15"} value="under_15" name="age_band"
                                    onClick={handleChange}><Icon name="child"/>11 - 14 ans</Button>
                            <Button positive={values.age_band === "under_20"} value="under_20" name="age_band"
                                    onClick={handleChange}><Icon name="child" size="large"/>15 - 19 ans</Button>
                            <Button positive={values.age_band === "over_20"} value="over_20" name="age_band"
                                    onClick={handleChange}><Icon name="child" size="large"/>Plus de 20 ans</Button>
                        </Button.Group>

                        <Transition visible={values.age_band === "under_11"} animation='scale'
                                    duration={500}>
                            <div>
                                <Divider hidden/>
                                <Message
                                    error
                                    header='Attention'
                                    visible={values.age_band === "under_11"}
                                >La vaccination est recommandée pour toutes les jeunes filles agées de 11 à 14 ans.
                                </Message>
                            </div>
                        </Transition>

                        <Transition visible={values.age_band === "over_20"} animation='scale'
                                    duration={500}>
                            <div>
                                <Divider hidden/>
                                <Message
                                    error
                                    header='Attention'
                                    visible={values.age_band === "over_20"}
                                >La vaccination anti HPV n’est plus recommandée après l’âge de 20 ans.
                                    Cependant, si vous souhaitez bénéficier de la vaccination (ce d’autant plus que vous
                                    n’avez
                                    pas encore eu de rapports sexuels), vous pouvez en parler avec votre médecin.
                                    Nous vous rappelons que la vaccination anti HPV ne protège pas des autres infections
                                    sexuellement transmissibles. Le port du préservatif reste indispensable.
                                    De plus le dépistage du cancer du col de l’utérus est recommandé à partir de 25 ans,
                                    tous
                                    les 3 ans.

                                </Message>
                            </div>
                        </Transition>

                        <Transition visible={!["under_11", "over_20"].includes(values.age_band)}
                                    animation='scale'
                                    duration={500}>
                            <div>
                                <Divider hidden/>
                                <label> Vaccin: </label>
                                <Button.Group>
                                    <Button positive={values.doses === 0} value={0} name="doses"
                                            onClick={handleChange}>Jamais vaccinée</Button>
                                    <Button positive={values.doses === 1} value={1} name="doses"
                                            onClick={handleChange}>1 dose</Button>
                                    <Button positive={values.doses === 2} value={2} name="doses"
                                            onClick={handleChange}>2 doses</Button>
                                    {
                                        values.age_band === "under_20" &&
                                        <Button positive={values.doses === 3} value={3} name="doses"
                                                onClick={handleChange}>3 doses</Button>
                                    }
                                </Button.Group>
                                <Transition visible={!["under_11", "over_20"].includes(values.age_band)
                                && values.doses !== ""
                                && !(values.age_band !== "under_20" && values.doses === 3)}
                                            animation='scale'
                                            duration={500}>
                                    <div>
                                        <Divider hidden/>
                                        <Message
                                            info
                                            visible={!["under_11", "over_20"].includes(values.age_band)
                                            && values.doses !== ""
                                            && !(values.age_band !== "under_20" && values.doses === 3)}
                                        >{!["under_11", "over_20"].includes(values.age_band)
                                        && values.doses !== ""
                                        && !(values.age_band !== "under_20" && values.doses === 3)
                                        && messages[values.age_band][values.doses]}</Message>
                                    </div>
                                </Transition>
                            </div>
                        </Transition>
                    </div>
                </Transition>
            </Segment>
        </Layout>
    )
};


EtVous.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        ...menu
    }
}

export default EtVous