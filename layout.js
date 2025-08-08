import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from 'react-native';

export default function TractreeHome() {
  const [activeCategory, setActiveCategory] = useState('Tractors');
  const [activeNav, setActiveNav] = useState('Home');

  const categories = [
    'Tractors',
    'Implements',
    'Spare Parts',
    'Accessories',
    'Services'
  ];

  const navItems = ['Home', 'News', 'Category', 'Account', 'Cart'];

  // Dummy demo images for promo tractor section
  const demoTractorImages = [
    'https://via.placeholder.com/120x90.png?text=Tractor+1',
    'https://via.placeholder.com/120x90.png?text=Tractor+2',
    'https://via.placeholder.com/120x90.png?text=Tractor+3',
  ];

  // Dummy demo product images for personalized section
  const demoProductImages = [
    'https://via.placeholder.com/120x140.png?text=Product+1',
    'https://via.placeholder.com/120x140.png?text=Product+2',
    'https://via.placeholder.com/120x140.png?text=Product+3',
    'https://via.placeholder.com/120x140.png?text=Product+4',
    'https://via.placeholder.com/120x140.png?text=Product+5',
  ];

  return (
    <View style={styles.container}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>Tractree</Text>
        <View style={styles.iconGroup}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.icon}>🔔</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tractors, accessories..."
          placeholderTextColor="#757575"
        />
        <Text style={styles.qrIcon}>📷</Text>
      </View>

      {/* Promo Section */}
      <View style={styles.promoBanner}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {demoTractorImages.map((uri, idx) => (
            <Image
              key={idx}
              source={{ uri }}
              style={styles.demoTractorImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <Text style={styles.promoHeadline}>Freedom Sale - Up to 60% Off</Text>
        <Text style={styles.promoSubtext}>ICICI / BOB offers</Text>
      </View>

      {/* Categories as Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesNav}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryButton,
              activeCategory === item && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory(item)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === item && styles.categoryButtonTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Personalized Section */}
      <View style={styles.personalizedSection}>
        <Text style={styles.sectionTitle}>Still looking for these?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {demoProductImages.map((uri, idx) => (
            <View key={idx} style={styles.productCard}>
              <Image
                source={{ uri }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productLabel}>Product {idx + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navItems.map((navItem) => (
          <Pressable
            key={navItem}
            onPress={() => setActiveNav(navItem)}
            style={({ pressed }) => [
              styles.navItem,
              pressed && styles.navItemPressed,
            ]}
          >
            <Text
              style={[
                styles.navText,
                activeNav === navItem && styles.navActive,
              ]}
            >
              {navItem}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 72, // prevents content hiding under nav
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    fontSize: 22,
    color: '#4CAF50',
    marginLeft: 12,
  },
  searchBar: {
    flexDirection: 'row',
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#212121',
  },
  qrIcon: {
    fontSize: 20,
    color: '#4CAF50',
    marginLeft: 10,
  },
  promoBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  demoTractorImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  promoHeadline: {
    color: '#212121',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
  },
  promoSubtext: {
    color: '#757575',
    fontSize: 14,
  },
  categoriesNav: {
    marginBottom: 12,
  },
  categoryButton: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryButtonActive: {
    backgroundColor: '#4CAF50', // Primary green
    borderColor: '#4CAF50',
  },
  categoryButtonText: {
    color: '#757575',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  personalizedSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
    color: '#212121',
  },
  productCard: {
    width: 120,
    height: 170,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productLabel: {
    marginTop: 4,
    color: '#212121',
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 64, // fixed size for tap comfort
    backgroundColor: '#FFFFFF',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 16 : 0, // safe area for iOS devices
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navItemPressed: {
    backgroundColor: Platform.OS === 'web' ? '#E0E0E0' : '#E8F5E9',
  },
  navText: {
    color: '#757575',
    fontSize: 14,
  },
  navActive: {
    color: '#4CAF50',
    fontWeight: '700',
  },
});
