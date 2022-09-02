/**
 * This component displays business category cards
 *
 * @param {function} handleSubmit For submitting the form
 */

import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity,ScrollView, View, Platform, Keyboard, Image, Button } from 'react-native';
import FlatScrollView from '../../../../modules/FlatScrollView';
import styles from './styles';
import { OmnitureTrackAction, OmnitureTrackState } from '../../../../utilities/helper/utils';
import I18n from '../../../../utilities/i18n/language.utils';
import CachedImage from '../../../../modules/CachedImage';
import { ICONS } from '../../../../utilities/constants/icons';

const UpgradeBusinessCategory = props => {
    const {
        goToNext,
        registrationConfig,
        merchantData,
        businessDetails,
        formSubCategory,
        bronzeUpgradeActions,
        merchantDetailsAction,
        businessCategory
    } = props;
    const scrollView = useRef();
    const flatListParentView = useRef();
    const [index1, setIndex] = useState(-1);
    const [category, setCategory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [coords,setCoords] = useState([])
    // const updateStoreList = () => {
    //     let storeList = [];
    //     if (registrationConfig && registrationConfig?.length > 0) {
    //         registrationConfig.forEach(item => {
    //             if (item.key === 'categoryStoreList') {
    //                 storeList = item.items;
    //             }
    //         });
    //     }
    //     return storeList;
    // };

    const setCategoryAndSubCategory = ({ businessCategory }, subCategory) => {
        OmnitureTrackAction('register:businessCategory:submit:click', { registrationStep: 'postLogin' });
        Keyboard.dismiss();
        const finalData = { ...businessDetails, subCategory, businessCategory };
        bronzeUpgradeActions.setBusinessInfo(finalData);
        goToNext('UpgradePanDetails');
    };
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
    console.log(scrollView,'scrollView')
    useEffect(() => {
        // const list = updateStoreList();
        // if (list?.length > 0) {
        //     setStoreList(list);
        // }
        //Verify again
        OmnitureTrackState('register:BusinessCategory', { registrationStep: 'postLogin' });
    }, []);
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
                    <CachedImage
                        resizeMethod="resize"
                        source={{ uri: categoryItem.imgUri }}
                        resizeMode="contain"
                        style={[styles.sideImgStyle]}
                    />
                    <Text
                        testID={'cardText' + index}
                        accessibilityLabel={Platform.select({ android: 'cardText' + index })}
                        style={[styles.cardTitle, { color: categoryItem?.color }]}
                    >
                        {categoryItem?.titleLocale[I18n.currentLocale()]}
                    </Text>
                    {categoryItem?.subCategory?.length > 1 && (
                        <Image
                            style={[styles.collapsiblestyle, { tintColor: categoryItem?.color }]}
                            source={
                                categoryItem?.businessCategory === category
                                    ? ICONS.COLLAPSIBLE
                                    : ICONS.COLLAPSIBLE_EXPAND
                            }
                        />
                    )}
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
            {/* <ScrollView
            ref={(ref) => {
                ref.current = ref
            }}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 27 }}
            >
            <Button title='Press me' onPress={scrollHandler} />
            <View>
                {businessCategory.items.map((item,index) => _renderItem({item,index}))}
            </View>
            </ScrollView> */}
        </View>
        </FlatScrollView>
    );
};

export default UpgradeBusinessCategory;
