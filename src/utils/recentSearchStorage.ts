import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 5;

/**
 * Get all recent searches from storage
 * @returns Array of recent search strings, most recent first
 */
export const getRecentSearches = async (): Promise<string[]> => {
  try {
    const searches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error getting recent searches:', error);
    return [];
  }
};

/**
 * Add a new search to recent searches
 * - If search already exists, moves it to the top
 * - Keeps only the last 5 searches
 * - Removes oldest if exceeding limit
 * @param search The search query to add
 */
export const addRecentSearch = async (search: string): Promise<void> => {
  try {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    // Get existing searches
    let searches = await getRecentSearches();

    // Remove the search if it already exists (to avoid duplicates)
    searches = searches.filter(
      (s) => s.toLowerCase() !== trimmedSearch.toLowerCase()
    );

    // Add the new search at the beginning (most recent first)
    searches.unshift(trimmedSearch);

    // Keep only the last MAX_RECENT_SEARCHES items
    if (searches.length > MAX_RECENT_SEARCHES) {
      searches = searches.slice(0, MAX_RECENT_SEARCHES);
    }

    // Save back to storage
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch (error) {
    console.error('Error adding recent search:', error);
  }
};

/**
 * Clear all recent searches from storage
 */
export const clearRecentSearches = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};

/**
 * Remove a specific search from recent searches
 * @param search The search query to remove
 */
export const removeRecentSearch = async (search: string): Promise<void> => {
  try {
    let searches = await getRecentSearches();
    searches = searches.filter(
      (s) => s.toLowerCase() !== search.toLowerCase()
    );
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
  } catch (error) {
    console.error('Error removing recent search:', error);
  }
};
