import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logo from '../../assets/logo.png';

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Hello ${incident.name},
    I would like to help in the case ${incident.title}
    with ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(incident.value)} `
  ;

  function navigateBack() {
    navigation.goBack()
  };

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `${incident.title}`,
      recipients: [`${incident.email}`],
      body: message,
    })
  };

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0}]}>NGO: </Text>
        <Text style={styles.incidentValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>Case:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Value:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero in this case.</Text>
        <Text style={styles.heroDescription}>Contact:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};
