import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { COLORS, ACCESSIBILITY, SPACING } from '../../theme/tokens';
import { AccessibleButton } from '../../components/common/AccessibleButton';
import { Card } from '../../components/common/Card';
import { useMemoryProfile } from '../../kori/MemoryProfileContext';
import { useLanguage } from '../../i18n/LanguageContext';

export const MemoryProfileScreen: React.FC = () => {
  const { t } = useLanguage();
  const { profile, updateProfile } = useMemoryProfile();
  const [routineText, setRoutineText] = useState(profile.routines[0]?.steps.join(' → ') || '');
  const [peopleText, setPeopleText] = useState(
    profile.people.map((p) => `${p.relation}: ${p.name}`).join('\n')
  );
  const [placesText, setPlacesText] = useState(profile.places.map((p) => p.name).join(', '));
  const [objectsText, setObjectsText] = useState(
    profile.objects.map((o) => o.name).join(', ')
  );
  const [saved, setSaved] = useState(false);

  const save = () => {
    const people = peopleText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, idx) => {
        const [relation, name] = line.split(':').map((s) => s.trim());
        return {
          id: `p${idx + 1}`,
          relation: relation || 'Family',
          name: name || relation || 'Someone',
        };
      });

    const places = placesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name, idx) => ({ id: `pl${idx + 1}`, name }));

    const objects = objectsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name, idx) => ({ id: `o${idx + 1}`, name, emoji: '🐚' }));

    const steps = routineText
      .split(/→|->|,/)
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile({
      people: people.length ? people : profile.people,
      places: places.length ? places : profile.places,
      objects: objects.length ? objects : profile.objects,
      routines: [{ id: 'r1', steps: steps.length ? steps : profile.routines[0].steps }],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('memoryProfileTitle')}</Text>
      <Text style={styles.sub}>{t('memoryProfileSub')}</Text>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border}>
        <Text style={styles.label}>{t('memoryPeople')}</Text>
        <Text style={styles.help}>{t('memoryPeopleHelp')}</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          multiline
          value={peopleText}
          onChangeText={setPeopleText}
        />
      </Card>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border}>
        <Text style={styles.label}>{t('memoryPlaces')}</Text>
        <TextInput style={styles.input} value={placesText} onChangeText={setPlacesText} />
      </Card>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border}>
        <Text style={styles.label}>{t('memoryObjects')}</Text>
        <TextInput style={styles.input} value={objectsText} onChangeText={setObjectsText} />
      </Card>

      <Card bgColor={COLORS.surface} borderColor={COLORS.border}>
        <Text style={styles.label}>{t('memoryRoutine')}</Text>
        <Text style={styles.help}>{t('memoryRoutineHelp')}</Text>
        <TextInput style={styles.input} value={routineText} onChangeText={setRoutineText} />
      </Card>

      <AccessibleButton title={t('memorySave')} onPress={save} variant="primary" iconName="save" />
      {saved && <Text style={styles.saved}>{t('memorySaved')}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  title: {
    fontSize: ACCESSIBILITY.fontSize.title - 2,
    fontWeight: '800',
    color: COLORS.text,
  },
  sub: {
    fontSize: ACCESSIBILITY.fontSize.body - 1,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: ACCESSIBILITY.lineHeight.body,
  },
  label: {
    fontSize: ACCESSIBILITY.fontSize.caption,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  help: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: ACCESSIBILITY.borderRadius.sm,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 48,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  saved: {
    textAlign: 'center',
    marginTop: SPACING.sm,
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: ACCESSIBILITY.fontSize.body,
  },
});
