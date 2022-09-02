// Used Settlement Tabs scrollTooffset function here

import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity,ScrollView, View, Platform, Keyboard, Image, Button } from 'react-native';
import FlatScrollView from '../../../../modules/FlatScrollView';
import styles from './styles';
import { ICONS } from '../../../../utilities/constants/icons';

const UpgradeBusinessCategory = props => {
    const {
        merchantData,
        businessDetails,
        merchantDetailsAction,
    } = props;
    const scrollView = useRef();
    const flatListParentView = useRef();
    const [index1, setIndex] = useState(-1);
    const [category, setCategory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [coords,setCoords] = useState([])
    const onContentSizeChanged = () => {
        if (index1 !== -1) {
            flatListParentView?.current?.measure((width, height, px, py) => {
                scrollView?.current?.scrollToOffset({
                    offset: 300,
                    animated: false
                });
            });
        }
    };
    const _renderItem = ({ item: categoryItem, index }) => {
        // const selected = false;
        const businessCategoriesCheck = business => {
            if (business?.subCategory?.length > 1) {
                setCategory(business?.businessCategory);
            } else {
                setCategoryAndSubCategory(business, business?.subCategory[0]);
            }
            setIndex(index)
        };
        return (
            <View
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout
                    console.log(layout,index)
                    coords[index] = layout.y
                    setCoords(coords)
                }}
                style={[
                    categoryItem?.businessCategory === category && categoryItem?.subCategory?.length > 1
                        ? styles.parentContainer
                        : { marginVertical: 5 }
                ]}
                key={categoryItem.title}
            >
                <TouchableOpacity
                    accessible
                    testID={categoryItem?.title}
                    accessibilityLabel={Platform.select({ android: categoryItem?.title })}
                    style={
                        categoryItem?.businessCategory === category &&
                        categoryItem?.subCategory?.length > 1 &&
                        styles.cardStyle
                    }
                    onPress={() => {businessCategoriesCheck(categoryItem)}}
                >
                 <Text>Hello</Text>
                </TouchableOpacity>
                {category === categoryItem?.businessCategory && categoryItem?.subCategory?.length > 1 && (
                    <View style={styles.businessSubcategoryAccordion}>
                        {categoryItem.subCategory.map((item, index) => (
                            <View style={styles.categoriesContainer}>
                                <TouchableOpacity
                                    style={styles.categoriesSubContainer}
                                    onPress={() => setCategoryAndSubCategory(categoryItem, item)}
                                >
                                    <View style={styles.textandImageContainer}>
                                        <Text style={styles.textStyles}>{item}</Text>
                                        <Image style={styles.imgStyles} source={ICONS.BLACK_CHEVRON_RIGHT} />
                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={!(index === categoryItem?.subCategory?.length - 1) && styles.horizontalLine}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <FlatScrollView onContentSizeChange={onContentSizeChanged} ref={scrollView}>
        <View
        ref={flatListParentView}
        style={styles.cardContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 27 }}
                data={businessCategory?.items}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item.title + index.toString()}
                initialNumToRender={businessCategory?.items?.length}
            />
        </View>
        </FlatScrollView>
    );
};

export default UpgradeBusinessCategory;

    const businessCategory = {
    "items": [
      {
        "titleLocale": {
          "en": "Art Craft and Collectibles",
          "hi": ""
        },
        "title": "Art Craft and Collectibles",
        "imgUri": "https://fcapp-cdn.freecharge.in/merchant/mobile/images/registration/store-list/stationary.png",
        "color": "#ffffff",
        "businessCategory": "Art Craft and Collectibles",
        "subCategory": [
          "Stationary, Printing And Writing Paper",
          "Antiques",
          "Art and craft supplies",
          "Art dealers and galleries",
          "Camera and photographic supplies",
          "Digital art",
          "Memorabilia",
          "Music store - instruments and sheet music",
          "Sewing, needlework and fabrics",
          "Stamp and coin",
          "Vintage and collectables"
        ]
      },
      {
        "titleLocale": {
          "en": "Goods Store",
          "hi": ""
        },
        "title": "Goods Store",
        "imgUri": "https://fcapp-cdn.freecharge.in/merchant/mobile/images/registration/store-list/dairy_products.png",
        "color": "#444444",
        "businessCategory": "Goods Store",
        "subCategory": ["Dairy Products Stores"]
      },
      {
        "titleLocale": {
          "en": "Automotive",
          "hi": ""
        },
        "title": "Automotive",
        "imgUri": "https://fcapp-cdn.freecharge.in/merchant/mobile/images/registration/store-list/service_stations.png",
        "color": "#ffffff",
        "businessCategory": "Automotive",
        "subCategory": ["Service Stations", "Automotive"]
      },
      {
        "titleLocale": {
          "en": "Education and Jobs",
          "hi": ""
        },
        "title": "Education and Jobs",
        "imgUri": "https://fcapp-cdn.freecharge.in/merchant/mobile/images/registration/store-list/education.png",
        "color": "#ffffff",
        "businessCategory": "Education and Jobs",
        "subCategory": [
          "Personal Teaching",
          "Job Consulting",
          "Online Teaching"
        ]
      },
      {
        "titleLocale": {
          "en": "Grocery and supermarkets",
          "hi": ""
        },
        "title": "Grocery and supermarkets",
        "imgUri": "https://fcapp-cdn.freecharge.in/merchant/mobile/images/registration/store-list/groceries.png",
        "color": "#444444",
        "businessCategory": "Grocery and supermarkets",
        "subCategory": ["Grocery"]
      },
      {
        "titleLocale": {
          "en": "Health And PersonalCare",
          "hi": ""
        },
        "title": "Health And PersonalCare",
        "imgUri": "https://fcapp-cdn.freecharge.in/merchant/mobile/images/registration/store-list/drugs_bg.png",
        "color": "#444444",
        "businessCategory": "Health And PersonalCare",
        "subCategory": [
          "Medical care",
          "Vision care",
          "Vitamins and supplements"
        ]
      }
    ]
  }
