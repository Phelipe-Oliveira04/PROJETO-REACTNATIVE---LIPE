import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet,Text,View,ScrollView,Image,TouchableOpacity,Share,Linking,Platform,} from 'react-native';
// Dados do currículo (edite aqui)
const CV = {
  nome: 'Phelipe Leandro Alves Oliveira',
  titulo: 'Desenvolvedor Mobile / React Native',
  resumo:
    'Sou um desenvolvedor com experiência em criar aplicações móveis usando React Native. Gosto de construir interfaces limpas e performáticas.',
  contato: {
    email: 'phelipeleandro4@gmail.com',
    telefone: '+55 81985330300',
    linkedin: 'https://www.linkedin.com/in/phelipe-leandro-oliveira/',
  },
  experiencia: [
    {
      empresa: 'Empresa Hospital São Marcos',
      periodo: '2024-Presente',
      descricao: 'Assistente Administrativo - Responsável por auxiliar nas atividades administrativas e operacionais do hospital, garantindo o bom funcionamento dos processos internos.',
    },
  ],
  educacao: [
    { instituicao: 'Faculdade Senac', periodo: '2024 - 2026', grau: 'Bacharel em Sistemas' },
  ],
  skills: ['React Native', 'TypeScript', 'Expo', 'Redux', 'GraphQL'],
};

export default function App() {
  const onShare = async () => {
    const message = `${CV.nome} - ${CV.titulo}\n\n${CV.resumo}\n\nContato: ${CV.contato.email} | ${CV.contato.telefone}\nLinkedIn: ${CV.contato.linkedin}`;
    try {
      await Share.share({
        message,
        title: `${CV.nome} - Currículo`,
      });
    } catch (error) {
      console.warn('Erro ao compartilhar', error);
    }
  };

  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else console.warn('Não é possível abrir URL:', url);
    } catch (err) {
      console.warn('Erro ao abrir link', err);
    }
  };

  const onEmail = () => {
    const mailto = `mailto:${CV.contato.email}`;
    openLink(mailto);
  };

  const onPhone = () => {
    const tel = Platform.OS === 'web' ? `tel:${CV.contato.telefone}` : `tel:${CV.contato.telefone}`;
    openLink(tel);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{CV.nome}</Text>
            <Text style={styles.title}>{CV.titulo}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          <Text style={styles.sectionText}>{CV.resumo}</Text>
        </View>

        <View style={styles.sectionRow}>
          <View style={[styles.section, {flex:1}] }>
            <Text style={styles.sectionTitle}>Contato</Text>
            <TouchableOpacity onPress={onEmail}>
              <Text style={styles.link}>{CV.contato.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPhone}>
              <Text style={styles.link}>{CV.contato.telefone}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink(CV.contato.linkedin)}>
              <Text style={styles.link}>{CV.contato.linkedin}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.section, {flex:1}] }>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {CV.skills.map((s) => (
                <View key={s} style={styles.skillPill}>
                  <Text style={styles.skillText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência</Text>
          {CV.experiencia.map((e) => (
            <View key={e.empresa} style={styles.item}>
              <Text style={styles.itemTitle}>{e.empresa} • {e.periodo}</Text>
              <Text style={styles.sectionText}>{e.descricao}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educação</Text>
          {CV.educacao.map((ed) => (
            <View key={ed.instituicao} style={styles.item}>
              <Text style={styles.itemTitle}>{ed.instituicao} • {ed.periodo}</Text>
              <Text style={styles.sectionText}>{ed.grau}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareButtonText}>Compartilhar Currículo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 88, height: 88, borderRadius: 44, marginRight: 12 },
  headerText: { flex: 1 },
  name: { fontSize: 22, fontWeight: '700' },
  title: { fontSize: 14, color: '#666', marginTop: 4 },
  section: { marginBottom: 14 },
  sectionRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  sectionText: { fontSize: 14, color: '#333', lineHeight: 20 },
  link: { color: '#1e90ff', fontSize: 14, marginBottom: 4 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillPill: { backgroundColor: '#eef2ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  skillText: { color: '#3b3b98', fontSize: 12 },
  item: { marginBottom: 8 },
  itemTitle: { fontWeight: '600', fontSize: 14 },
  shareButton: { marginTop: 10, backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, alignItems: 'center' },
  shareButtonText: { color: '#fff', fontWeight: '700' },
});
