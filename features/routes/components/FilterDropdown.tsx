import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export type SortBy = 'best' | 'pollution' | 'crossings' | 'deviation' | 'bikepath';

interface FilterDropdownProps {
    visible: boolean;
    selectedSort: SortBy;
    onSelectSort: (sort: SortBy) => void;
    onClose: () => void;
    top?: number;
}

export default function FilterDropdown({ visible, selectedSort, onSelectSort, onClose, top }: FilterDropdownProps) {
    const icons = React.useMemo(() => ({
        pollution: require('../../../assets/images/routes/pollution.png'),
        danger: require('../../../assets/images/routes/danger.png'),
        deviation: require('../../../assets/images/routes/deviation.png'),
        bike: require('../../../assets/images/routes/bike.png'),
    }), []);

    if (!visible) return null;

    const Row = ({
        active,
        children,
        onPress,
        left,
    }: { active?: boolean; children: React.ReactNode; onPress?: () => void; left: React.ReactNode }) => (
        <Pressable
            onPress={onPress}
            style={[styles.row, active && styles.rowActive]}
        >
            <View style={styles.left}>{left}</View>
            <Text style={styles.rowText}>{children}</Text>
        </Pressable>
    );

    return (
        <View
            style={[
                styles.container,
                top !== undefined ? { top } : null,
            ]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Ordenar por:</Text>
                <MaterialIcons name="close" size={24} color="#333" onPress={onClose} />
            </View>

            <Row
                active={selectedSort === 'best'}
                onPress={() => onSelectSort('best')}
                left={<AntDesign name="star" size={18} />}
            >
                Mejor ruta primero
            </Row>
            <Row
                active={selectedSort === 'pollution'}
                onPress={() => onSelectSort('pollution')}
                left={<Image source={icons.pollution} style={styles.imgIcon} resizeMode="contain" />}
            >
                Índice de contaminación
            </Row>
            <Row
                active={selectedSort === 'crossings'}
                onPress={() => onSelectSort('crossings')}
                left={<Image source={icons.danger} style={styles.imgIcon} resizeMode="contain" />}
            >
                Cruces o intersecciones
            </Row>
            <Row
                active={selectedSort === 'deviation'}
                onPress={() => onSelectSort('deviation')}
                left={<Image source={icons.deviation} style={styles.imgIcon} resizeMode="contain" />}
            >
                Desviación
            </Row>
            <Row
                active={selectedSort === 'bikepath'}
                onPress={() => onSelectSort('bikepath')}
                left={<Image source={icons.bike} style={styles.imgIcon} resizeMode="contain" />}
            >
                Tramo sin carril bici
            </Row>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        zIndex: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    title: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'Afacad',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 8,
    },
    rowActive: {
        backgroundColor: 'rgba(188, 119, 105, 0.56)',
    },
    left: {
        width: 22,
        height: 22,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowText: {
        fontSize: 16,
        color: '#222',
        fontFamily: 'Afacad',
    },
    imgIcon: { width: 20, height: 20 },
});
