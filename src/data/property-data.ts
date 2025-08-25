import type { Property } from '@/lib/types';

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'sattva-city-prestige-residence-apartment',
    name: 'Sattva City Prestige Residence Apartment',
    slug: 'sattva-city-prestige-residence-apartment',
    city: 'bangalore',
    area: 'north',
    type: 'apartment',
    priceRange: { min: 5500000, max: 86200000 },
    currency: 'INR',
    description:
      'Experience luxury living at Aparna Constructions Premium in West Bangalore. This premium residential project offers world-class amenities and modern architecture with excellent connectivity to major IT hubs.',
    shortDescription: 'Premium residential project with world-class amenities in West Bangalore.',
    features: [
      '24x7 Security with CCTV Surveillance',
      'Swimming Pool with Kids Pool',
      'State-of-the-art Gymnasium',
      'Children Play Area',
      'Covered Car Parking',
      'Power Backup',
      'Rainwater Harvesting',
      'Landscaped Gardens',
    ],
    amenities: [
      'Club House',
      'Swimming Pool',
      'Gymnasium',
      'Landscaped Gardens',
      'Children Play Area',
      'Jogging Track',
      'Basketball Court',
      'Multipurpose Hall',
      'Yoga/Meditation Area',
      'Senior Citizens Sitout',
    ],
    specifications: {
      totalFloors: 15,
      totalUnits: 120,
      launchDate: '2024',
      possessionDate: '2026',
      approvals: ['RERA', 'BDA', 'BESCOM', 'BWSSB'],
      constructionType: 'RCC Framed Structure',
      elevators: 2,
      parkingRatio: '1:1',
    },
    featuredImage: 'https://placehold.co/800x600.png',
    masterPlan: 'https://placehold.co/800x800.png',
    floorPlans: [
      {
        id: 'floorplan-1',
        name: '2BHK Premium',
        type: 'apartment',
        area: 1200,
        bedrooms: 2,
        bathrooms: 2,
        price: 75000000,
        image: 'https://placehold.co/600x400.png',
        description: 'Spacious 2BHK apartment with modern amenities and luxury finishes.',
      },
      {
        id: 'floorplan-2',
        name: '3BHK Luxury',
        type: 'apartment',
        area: 1800,
        bedrooms: 3,
        bathrooms: 3,
        price: 120000000,
        image: 'https://placehold.co/600x400.png',
        description: 'Luxurious 3BHK apartment with premium interiors and expansive views.',
      },
    ],
    address: '123, Prestige Road, Bangalore,    Karnataka, India',
    coordinates: { lat: 12.9715987, lng: 77.594566 },
    developer: 'Aparna Constructions',
    possession: '2026',
    status: 'upcoming',
    updatedAt: '2025-08-22',
    createdAt: '2025-08-22',
    propertyDetailPage: {
      propertyBannerSection: {
        headingOne: 'Sattva City',
        headingTwo: 'Prestige Residence Apartment',
        mainBannerImageUrl:
          'https://placehold.co/1200x800.png',
        primeLocationAt: 'Prime Location at Chikkajala, North Bengaluru',
        projectStatusTitle: 'Project status: ',
        projectStatusValue: 'New Launch',
        isReraCertified: true,
        reraLogo: 'https://placehold.co/100x50.png',
        reraCertifiedLabel: 'RERA Certified',
        priceRangeLabel: 'Price range',
        grabEarlyBirdAdvantages: 'Grab early bird advantages',
        limitedSlotsAvailable: 'Limited slots available',
        brochureCta: 'Brochure',
        bookVisitCta: 'Book visit',
        viewAllPhotosCta: 'View all photos',
        specifications: [
          { id: 'total-area', value: '53 Acres', displayText: 'Total area' },
          { id: 'size', value: '655 - 7503 Sq. ft.', displayText: 'Size' },
          { id: 'units', value: '3460', displayText: 'Number of Units' },
          {
            id: 'unit-config',
            value: '1, 2, 3 & 4 BHK flats',
            displayText: 'Unit config.',
          },
          {
            id: 'studio',
            value: 'Studio',
            displayText: 'Apartment Variant',
          },
          {
            id: 'penthouse',
            value: 'Penthouse',
            displayText: 'Apartment Variant',
          },
        ],
      },
      propertyLocationAndConnectivitySection: {
        mainHeading: 'Location & Connectivity',
        locationText: 'Chikkajala, North Bengaluru, Karnataka, 560035',
        locationImage:
          'https://placehold.co/600x400.png',
        locationLinkText: 'View in detail',
        locationLink: 'https://maps.app.goo.gl/XgsP1SJNzLBRRzEh7',
        locationTabs: [
          {
            id: 'connectivity',
            tabName: 'Connectivity',
            connectivity: [
              { name: 'Doddajala Metro Station', time: '', distance: '2.7 km' },
            ],
          },
        ],
      },
      propertyOverviewSection: {
        projectOverviewLabel: 'Project Overview',
        projectWalkthroughLabel: 'Project walkthrough',
        projectOverviewDescription:
          'Sattva City at Chikkajala is a premium pre-launch township by Sattva Group, spanning 53 acres with 80% open space. Comprising 13 G+17 high-rise towers and 3,460 (shown in homepage) luxury residences, including Studio to Penthouse variants, it blends modern architecture with a village-inspired gated community. Sattva City offers 50+ world-class amenities and exceptional connectivity. This landmark project promises refined living and strong investment potential, with completion scheduled for March 2029.',
        propertySpecifications: [
          { id: 'total-area-overview', value: '53 Acres', displayText: 'Total area' },
        ],
        isReraCertified: true,
        reraLogo: 'https://placehold.co/100x50.png',
        reraCertifiedLabel: 'Project RERA certified',
        reraNumberLabel: 'RERA No: ',
        projectReraNumber: 'PRM/KA/RERA/1250/303/PR/080525/007730',
        keyProjectDatesTitle: 'Key Project Dates',
        keyProjectDates: [
          { id: 'prelaunch-date', title: 'Prelaunch Date', date: 'May 2024' },
        ],
        projectOverviewImageUrl:
          'https://placehold.co/600x400.png',
        projectOverviewViewMoreCta: 'View more',
      },
      propertyAmenitiesSection: {
        variant: 'dark',
        mainHeading: 'Sattva City Amenities',
        subtitle:
          'Sattva City offers thoughtfully curated amenities to suit diverse lifestyles. From verdant landscapes fostering serenity to modern facilities ensuring convenience, every element is designed to enrich daily living and cater to individual tastes.',
        amenitiesAccordionItems: [
          {
            id: 'nature-tranquility',
            amenitiesTitle: 'Nature & Tranquility',
            amenitiesItems: [
              {
                id: 'nature-trail',
                title: 'Nature Trail',
              },
            ],
          },
        ],
        cardSlideItems: [
          {
            id: 'slider-one',
            src: 'https://placehold.co/600x400.png',
            alt: 'Slider One',
          },
        ],
      },
      propertyHighlightsSection: {
        propertyHighlightsTitle: 'Sattva City Highlights',
        propertyHighlightsDescription:
          'Sattva City unfolds across 53 acres with 80% verdant expanse, presenting landscaped grandeur and serene environs for elevated living.',
        propertyHighlights: [
          {
            highlightId: 'luxury-living',
            highlightImageUrl:
              'https://placehold.co/400x300.png',
            highlightDescription:
              'Lavish community offering luxury living amidst serene surroundings',
          },
        ],
      },
      propertyMasterPlanSection: {
        masterPlanTitle: 'Master Plan',
        masterPlanImageUrl:
          'https://placehold.co/800x800.png',
        masterPlanDescription:
          'Sattva City’s master plan spans 49.65 acres in Chikkajala, featuring 13 iconic towers, defined entry-exit points, 50+ outdoor experiences, and provisions for future developments.',
        masterPlanEnquireNowCta: 'Enquire now',
        masterPlanViewInDetailCta: 'View in detail',
      },
      propertyUnitPlansSection: {
        unitPlanTitle: 'Floor Plan',
        unitPlanDescription:
          'The Sattva City floor plan offers residences from elegant studios to lavish penthouses, spanning 450 to 2,895 sq. ft. Across 3640 units in 13 towers, the design blends privacy, seamless layouts, and panoramic views, embodying grandeur and refined living. Every detail reflects architectural finesse, curating an elevated lifestyle experience.',
        unitPlanViewInDetailCta: 'View in detail',
        unitPlans: [
          {
            id: 'studio-plan',
            unitPlanTitle: 'Studio',
            unitPlanDescription:
              'The studio residence exudes minimalist elegance with every inch crafted for optimal functionality and chic sophistication.',
            unitPlanImageUrl:
              'https://placehold.co/600x400.png',
            unitPlanEnquireUrl: '#',
          },
        ],
      },
      propertyPricingSection: {
        pricingTitle: 'Sattva City Price',
        pricingDescription:
          'Experience premium living at Sattva City with pre-launch pricing of ₹8,400 per sq. ft., open until October 2025. Residences, from 655 to 2,895 sq. ft., embody architectural excellence and strategic value. Post-launch, rates are expected to climb to ₹11,000–₹11,500 per sq. ft., making early acquisition highly advantageous.',
        pricingImageUrl:
          'https://placehold.co/600x400.png',
        completeCostingDetailsLabel: 'Complete costing details',
        pricingEnquireNowCta: 'Enquire now',
        pricingData: [
          {
            pricingId: 'studio',
            pricingConfigType: 'Studio',
            pricingCarpetApproxArea: '450 - 550 Sq Ft',
            price: 'Only on request',
            pricingEnquireCtaText: 'Request',
          },
        ],
      },
      propertySpecificationsSection: {
        specificationTitle: 'Sattva specification',
        specificationDescription:
          'At Sattva City, every element is built on a foundation of trust, precision, and thoughtful design. From sturdy structures to elegant finishes, we ensure that each detail reflects long-term value and timeless style. The materials and techniques used are curated to elevate everyday living while standing the test of time.',
        specificationViewInDetailCta: 'View in detail',
        specificationImageUrl:
          'https://placehold.co/600x400.png',
      },
      propertyLocationSection: {
        propertyLoactionTitle: 'Know about Chikkajala',
        propertyLoactionDescription:
          'Chikkajala, in Bangalore Urban district, blends heritage charm with modern convenience. Known for the historic Chikkajala Fort, the area offers excellent proximity to highways, tech parks, railway stations, and Kempegowda International Airport. Metro access via the Blue Line and a strong BMTC bus network ensure quick connectivity to prime city zones, making it a top investment hotspot in North Bangalore.',
        propertyLoactionImageUrl:
          'https://placehold.co/600x400.png',
        propertyLoactionInformation: [
          {
            estateInfoId: 'history',
            estateInfoTitle: 'History',
            estateInfoDescription:
              'Chikkajala’s roots date back centuries, with the ancient fort as its defining landmark. Once a quiet settlement, it has evolved into a vibrant locality that preserves its cultural identity while embracing rapid urban growth.',
          },
        ],
      },
      propertyDetailsFAQSection: {
        mainHeading: 'Frequently asked questions',
        subtitle: "Didn't find the question?",
        contactButtonText: 'Contact us',
        faqItems: [
          {
            id: 'faq-1',
            question: 'Who is Pattem Estates?',
            answer:
              'Pattem Estates, part of the Pattem Group of Companies, is a global luxury real estate brand focused on premium apartments, townships, commercial hubs, and bespoke interiors.',
          },
        ],
      },
    },
    propertyMasterPlanDetailPage: {
      propertyMasterPlanBannerSection: {
        bannerSectionHeader: 'Sattva Hamlet Master Plan - A Vision in 53 Acres',
        bannerSectionCta: 'Enquire now',
        bannerSectionImageUrl:
          'https://placehold.co/1200x800.png',
        bannerSectionDescription:
          'Sattva City spans 49.65 acres in Chikkajala, featuring 13 elegant towers, 50+ premium outdoor amenities, and planned future enhancements. This single-phase development, launching in October 2025 and completing in 2029, offers over 80% open green landscapes with less than 20% construction. Residences include Studio, 1, 2, 2.5, 3, 3.5, and 4 BHK units, plus luxurious penthouses, all Vaastu-compliant to harmonize modern living with timeless design principles',
        bannerSectionFeatures: [
          {
            title: 'Diverse Home Options',
            description: 'Choose from Studio, 1, 2, 2.5, 3, 3.5, 4 BHKs, and Penthouses.',
          },
        ],
      },
      propertyMasterPlanTowersSection: {
        towerSectionHeading: 'Smartly planned towers for modern living',
        towerSectionDescription:
          'Sattva City includes 13 towers carefully positioned to optimize light, ventilation, and greenery access. Each tower integrates features for a peaceful, elevated lifestyle:',
        towerSectionAmenitiesHeading: ' Amenities & Orientation',
        towerSectionUnitSizesHeading: 'Unit Sizes within Towers',
        towerSectionUnitSizesSubHeading: 'Select from a diverse range of well-sized homes:',
        towerSectionTableDescription:
          'All apartment units—from Studio to 4BHK and Penthouses—are thoughtfully placed to maximize green views and daylight. Each unit is well-ventilated and Vaastu-compliant, offering better living experience across the towers',
        towerSectionSliderImages: [
          {
            id: 'sample-image-1',
            src: 'https://placehold.co/600x400.png',
            alt: 'Mountain landscape with snow-capped peaks',
          },
        ],
        towerSectionTableDetails: [
          {
            towerRange: 'Tower 1 - 4',
            floors: '2B + G + 21UF',
            specialFeature: 'Amenity-facing, greenery views',
          },
        ],
        towerSectionAmenitiesPoints: [
          {
            description:
              'T01-T08 are amenity-facing—the ideal spot for families and leisure seekers.',
          },
        ],
        towerSectionUnitsSizes: [
          { type: 'Studio', sizeRange: '450 - 550 Sq Ft' },
        ],
      },
      propertyMasterPlanFeaturesSection: {
        features: [
          {
            featuresSectionTittle: 'Clubhouse Master Plan',
            featuresSectionFeaturesHeading: ' Feature-Rich Spaces',
            featuresSectionAccessibilityHeading: 'Accessibility & Layout Strategy',
            featuresSectionDescription:
              'The development boasts three luxurious clubhouses, each 35,000 sq ft across two levels, forming the community’s social and recreational core. Strategically placed near the central tower for easy access while maintaining residential serenity, they offer elegant spaces for relaxation, gatherings, and leisure, providing a refined retreat from daily routine.',
            featuresSectionBannerImageUrl:
              'https://placehold.co/600x400.png',
            featuresSectionFeatureRichSpaces: [
              'Indoor games',
            ],
            featuresSectionAccessibilityLayoutStrategies: [
              'Positioned strategically near Tower 5, the clubhouse offers convenient central access to residents across the site.',
            ],
          },
        ],
      },
      propertyMasterPlanFAQSection: {
        mainHeading: 'Frequently asked questions',
        subtitle: "Didn't find the question",
        contactButtonText: 'Contact us',
        faqItems: [
          {
            id: 'master-plan-faq-1',
            question: 'Will there be lifts in all 13 towers?',
            answer: 'Yes, each tower has high-speed elevators and service lifts.',
          },
        ],
      },
    },
    propertyUnitPlanDetailPage: {
      propertyFloorPlanSection: {
        floorPlanSectionHeading: 'Sattva City Floor Plan',
        floorPlanSectionDescription:
          'Experience meticulously curated living spaces designed to embody harmony and opulence. Sattva City presents an array of configurations, from posh studio residences to expansive 4 BHK homes and lavish penthouses, encompassing 3,640 units across 13 architecturally refined towers, each rising G + 17 floors.',
        floorPlanSectionPlans: [
          {
            id: 'plan-1',
            title: 'Studio',
            description:
              'An intimate haven for the modern resident, the studio residence exudes minimalist elegance with every inch crafted for optimal functionality and chic sophistication.',
            imageUrl:
              'https://placehold.co/600x400.png',
            enquiryNowUrl: '#',
          },
        ],
      },
      propertyDesignAndQualitySection: {
        designAndQualitySectionHeading: 'Design & Quality Features',
        designAndQualitySectionFeatures: [
          {
            id: 'feature-1',
            title: 'Vaastu-Compliant Layouts',
            description: 'Ensuring balanced energy and thoughtful orientation.',
            imageUrl:
              'https://placehold.co/400x300.png',
          },
        ],
      },
      propertyUnitSizesSection: {
        unitSizesSectionHeading: 'Unit Sizes within Towers',
        unitSizesWithinTower: [
          {
            configurationType: 'Studio',
            carpetAreaApprox: '450 - 550 Sq Ft',
            price: 'On Request',
            priceEnquireLabel: 'Request',
          },
        ],
      },
      propertyUnitHighlightsSection: {
        highlightsSectionHeading: 'Unit Highlights & Layout Intentions',
        highlightsSectionHighlights: [
          {
            name: 'Studio (450 - 550 Sq Ft)',
            description:
              'The studio residences at Sattva City feature an elegantly integrated layout, uniting kitchen, living, and sleeping areas into one versatile space. Ideal for individuals or bachelors seeking a refined compact lifestyle, the project offers 716 thoughtfully designed units for discerning buyers.',
            image: [
              {
                id: 'unit-highlight-image-1',
                src: 'https://placehold.co/600x400.png',
                alt: 'Mountain landscape with snow-capped peaks',
              },
            ],
          },
        ],
      },
      propertyUnitPlanFAQSection: {
        mainHeading: 'Frequently asked questions',
        subtitle: "Didn't find the question",
        contactButtonText: 'Contact us',
        faqItems: [
          {
            id: 'floorOrUnitPageFAQ1',
            question: 'What does a floor plan represent?',
            answer:
              'It shows the layout of rooms, doors, and windows, helping assess space suitability.',
          },
        ],
      },
    },
    propertyAmenitiesDetailPage: {
      propertyAmenitiesAccordionSection: {
        variant: 'light',
        mainHeading: 'Amenities that Elevate Everyday Living',
        subtitle:
          'Thoughtfully curated for all ages and interests, Sattva City offers a resort-inspired lifestyle where lush outdoor landscapes meet refined indoor conveniences. Each space is designed to foster connection, wellness, and leisure, blending natural serenity with modern comforts.',
        footerDescription:
          'The amenities at Sattva City embody the essence of luxury living, featuring state-of-the-art fitness, sports, and lifestyle facilities. From scenic walking paths and a sky club to a swimming pool, basketball court, and clubhouse, every detail is crafted for recreation and relaxation.',
        amenitiesAccordionItems: [
          {
            id: 'nature-tranquility-amenities',
            amenitiesTitle: 'Nature & Tranquility',
            amenitiesItems: [
              {
                id: 'nature-trail-amenities',
                title: 'Nature Trail',
              },
            ],
          },
        ],
        cardSlideItems: [
          {
            id: 'amenities-slider-1',
            src: 'https://placehold.co/600x400.png',
            alt: 'Amenities slider image',
          },
        ],
      },
      propertyAmenitiesGalleryShowCaseArea: [
        {
          amenitiesGalleryTitle: 'Community Amenities',
          amenitiesGalleryDescription:
            'The project offers dedicated recreational spaces, providing a serene environment for residents to unwind from daily routines. Designed to encourage social interaction, these areas create the perfect setting to connect and enjoy memorable moments with friends.',
          amenitiesGalleryAttractions: [
            'Epicenter of Elite Gatherings',
          ],
          amenitiesGallerySlideImages: [
            {
              id: 'gallery-image-1',
              src: 'https://placehold.co/600x400.png',
              alt: 'Community amenities image',
            },
          ],
          amenitiesGallerySecondHeading: 'Feature-Rich Spaces',
          communityAmenities: [
            'Club House',
          ],
          id: 'CommunityAmenities-1',
        },
      ],
      propertyAmenitiesFAQSection: {
        mainHeading: 'Frequently asked questions',
        subtitle: "Didn't find the question",
        contactButtonText: 'Contact us',
        faqItems: [
          {
            id: 'amenities-faq-1',
            question: 'Does Sattva Hamlet offer features for children?',
            answer:
              'Yes, it includes a sandpit, tree house, sensory play wall, indoor play area, playgrounds, and butterfly garden.',
          },
        ],
      },
    },
    propertySpecificationsDetailPage: {
      propertySpecificationsBannerSection: {
        specificationsBannerSectionTitle: 'Sattva City Specifications',
        specificationsBannerSectionDescription:
          'At Sattva City, specifications transcend mere details, they embody the promise of excellence. From precision-laid vitrified tiles and chrome-plated fittings to laminated flush shutters and RCC-framed structures, every component is curated for enduring strength and refined aesthetics. Premium PVC-insulated copper wiring, wooden doors, and sleek sliding shutters further elevate functionality with sophistication. Each element reflects a steadfast commitment to quality, ensuring that your home harmonizes durability with timeless elegance.',
        specificationsBannerSectionImageUrl:
          'https://placehold.co/1200x800.png',
        specificationsBannerSectionMobileImageUrl:
          'https://placehold.co/400x600.png',
      },
      propertySpecificationsGalleryShowCaseArea: [
        {
          specificationsGalleryTitle: 'Flooring',
          specificationsGalleryDescription:
            'Each apartment features refined flooring designed for elegance and longevity. The master bedroom offers laminated flooring and a balcony for natural light and airflow, while other bedrooms have vitrified tiles with concealed wiring, modular switches, and TV points. Vitrified tiles extend through living areas, kitchens, and hallways, with ceramic tiles in balconies, and granite in reception areas complemented by quality tiling in common spaces.',
          specificationsGalleryFeatures: [
            'Laminated Flooring for Master Bedroom.',
          ],
          specificationsGalleryImageUrl:
            'https://placehold.co/600x400.png',
        },
      ],
      propertySpecificationFAQSection: {
        mainHeading: 'Frequently asked questions',
        subtitle: "Didn't find the question",
        contactButtonText: 'Contact us',
        faqItems: [
          {
            id: 'spec-faq-1',
            question: 'Are there sufficient power points in the kitchen?',
            answer: 'Yes, the kitchen has multiple outlets for all modern appliances.',
          },
        ],
      },
    },
  },
];
