import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  getRecentSearches,
  clearRecentSearches,
} from '../utils/recentSearchStorage';

interface RecentSearchesProps {
  onSearchSelect: (search: string) => void;
  visible?: boolean;
  refreshTrigger?: number; // Used to force refresh from parent
  asDropdown?: boolean; // Show as dropdown below search bar
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  onSearchSelect,
  visible = true,
  refreshTrigger = 0,
  asDropdown = false,
}) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches
  const loadRecentSearches = async () => {
    const searches = await getRecentSearches();
    setRecentSearches(searches);
  };

  useEffect(() => {
    if (visible) {
      loadRecentSearches();
    }
  }, [visible, refreshTrigger]);

  // Handle clear all
  const handleClearAll = async () => {
    await clearRecentSearches();
    setRecentSearches([]);
  };

  if (!visible || recentSearches.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, asDropdown && styles.dropdownContainer]}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {asDropdown ? (
        <FlatList
          data={recentSearches}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => onSearchSelect(item)}
            >
              <Text style={styles.clockIcon}>🕒</Text>
              <Text style={styles.dropdownText} numberOfLines={1}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.listContainer}>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onPress={() => onSearchSelect(search)}
            >
              <Text style={styles.clockIcon}>🕒</Text>
              <Text style={styles.listText} numberOfLines={1}>
                {search}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 16,
    marginTop: 8,
    maxHeight: 300,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  clearButton: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  listContainer: {
    gap: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  clockIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
});
