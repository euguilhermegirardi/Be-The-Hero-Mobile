import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import logo from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';


export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadIncidents();
  },[]);

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page +1);
    setLoading(false);
  };

  function navigateToDetails(incident) {
    navigation.navigate('Details', { incident })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo}/>
        <Text style={styles.headerTxt}>
          Total of <Text style={styles.headerTxtBold}>{total} cases.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Chose one case and save the day!</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO: </Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Case:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Value:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetails(incident)}
            >
              <Text style={styles.detailsButtonText}>More details...</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
        </View>
        )}
      />
    </View>
  )
};
