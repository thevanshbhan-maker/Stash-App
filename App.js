import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Note');

  const categories = ['Note', 'Link', 'Snippet'];

  // Load saved data when the app starts
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@stash_items');
      if (savedData !== null) {
        setItems(JSON.parse(savedData));
      }
    } catch (e) {
      console.log('Error loading items', e);
    }
  };

  const saveItemsToStorage = async (newItems) => {
    try {
      await AsyncStorage.setItem('@stash_items', JSON.stringify(newItems));
    } catch (e) {
      console.log('Error saving items', e);
    }
  };

  const handleAddItem = () => {
    if (inputText.trim() === '') {
      Alert.alert('Empty Input', 'Please type something before saving!');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      text: inputText,
      category: selectedCategory,
      date: new Date().toLocaleDateString(),
    };

    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    saveItemsToStorage(updatedItems);
    setInputText('');
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveItemsToStorage(updatedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Stash</Text>
        <Text style={styles.subtitle}>Save useful notes, links, and snippets</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.input}
          placeholder="Type or paste your content here..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        {/* Category Selector */}
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(cat)}>
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.activeChipText,
                ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleAddItem}>
          <Text style={styles.saveButtonText}>Save Item</Text>
        </TouchableOpacity>
      </View>

      {/* Feed / List View */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items saved yet. Stash something!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.badge}>{item.category}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.itemContent}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  inputCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#0F172A',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    minHeight: 70,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#334155',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: '#38BDF8',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#0F172A',
  },
  saveButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#334155',
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  dateText: {
    color: '#64748B',
    fontSize: 11,
  },
  itemContent: {
    color: '#F1F5F9',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  deleteButton: {
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
});
