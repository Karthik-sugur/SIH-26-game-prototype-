import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/tokens';
import { useKoriSession } from '../../kori/engine/KoriSessionContext';
import { KoriStartScreen } from './KoriStartScreen';
import { KoriObserveScreen } from './KoriObserveScreen';
import { KoriRecallScreen } from './KoriRecallScreen';
import { KoriDelayScreen } from './KoriDelayScreen';
import { KoriEndScreen } from './KoriEndScreen';

/**
 * Single Activity-tab host that switches by Kori session phase.
 */
export const KoriFlowScreen: React.FC = () => {
  const { phase, resetToStart } = useKoriSession();

  const exitToStart = () => resetToStart();

  return (
    <View style={styles.root}>
      {phase === 'start' && <KoriStartScreen />}
      {phase === 'observe' && <KoriObserveScreen onExit={exitToStart} />}
      {(phase === 'recall' || phase === 'sequence' || phase === 'delayed') && (
        <KoriRecallScreen onExit={exitToStart} />
      )}
      {phase === 'delayWait' && <KoriDelayScreen onExit={exitToStart} />}
      {phase === 'end' && <KoriEndScreen onDone={exitToStart} />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
