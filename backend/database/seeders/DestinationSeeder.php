<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        Destination::truncate();

        $rows = [
            [1, "Marrakech", "Marrakech", "مراكش", "marrakech", "city", "Marrakech-Safi", 31.6295, -7.9811,
                "The Red City dazzles with the chaos of Jemaa el-Fnaa, the calm of the Majorelle Garden, and a medina where every alley hides a workshop, a riad, or a spice stall.",
                "La Ville Rouge éblouit avec le chaos de Jemaa el-Fnaa et le calme du Jardin Majorelle.",
                "المدينة الحمراء تبهر بفوضى جامع الفنا وهدوء حديقة ماجوريل.",
                "https://images.unsplash.com/photo-1597212720158-c9187e75a7f3?w=1200&q=80",
                "Mar–May, Sep–Nov", 9, 8, 6, false, true, 4.7, 18420],
            [2, "Chefchaouen", "Chefchaouen", "شفشاون", "chefchaouen", "village", "Tanger-Tétouan-Al Hoceïma", 35.1688, -5.2636,
                "The Blue Pearl of the Rif mountains, where every wall, staircase, and doorway is painted in shades of blue.",
                "La Perle Bleue des montagnes du Rif, où chaque mur est peint en bleu.",
                "اللؤلؤة الزرقاء لجبال الريف حيث يُطلى كل جدار باللون الأزرق.",
                "https://images.unsplash.com/photo-1553603227-2358aabe821e?w=1200&q=80",
                "Apr–Jun, Sep–Oct", 6, 9, 8, false, false, 4.8, 9310],
            [3, "Merzouga Desert", "Désert de Merzouga", "مرزوكة", "merzouga", "desert", "Drâa-Tafilalet", 31.0801, -4.0133,
                "The golden dunes of Erg Chebbi rise up to 150m at the edge of the Sahara.",
                "Les dunes dorées de l'Erg Chebbi s'élèvent jusqu'à 150m aux portes du Sahara.",
                "كثبان عرق الشبي الذهبية ترتفع حتى 150 مترًا عند حدود الصحراء الكبرى.",
                "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=80",
                "Oct–Apr", 5, 8, 7, false, false, 4.9, 7204],
            [4, "Essaouira", "Essaouira", "الصويرة", "essaouira", "beach", "Marrakech-Safi", 31.5085, -9.7595,
                "A windswept Atlantic port town famous for its fortified medina, fresh seafood, and great surf conditions.",
                "Une ville portuaire atlantique balayée par les vents, célèbre pour sa médina fortifiée.",
                "مدينة ميناء أطلسية تشتهر بمدينتها المحصنة وأجواء ركوب الأمواج الرائعة.",
                "https://images.unsplash.com/photo-1590059390047-863e5c0dfc02?w=1200&q=80",
                "Apr–Oct", 5, 9, 8, true, false, 4.6, 5230],
            [5, "Fez", "Fès", "فاس", "fez", "city", "Fès-Meknès", 34.0331, -5.0003,
                "Home to the world's largest car-free urban zone, the Fez medina is a living medieval maze.",
                "La médina de Fès est un labyrinthe médiéval vivant de tanneries et de médersas.",
                "مدينة فاس العتيقة متاهة من المدابغ والمدارس وأقدم جامعة في العالم.",
                "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
                "Mar–May, Sep–Nov", 7, 8, 6, false, true, 4.7, 11200],
            [6, "Todra Gorges", "Gorges du Todra", "أخاديد تودرا", "todra-gorges", "mountain", "Drâa-Tafilalet", 31.5860, -5.5806,
                "Sheer 300m rock walls squeeze into a narrow canyon carved by the Todra River.",
                "Des parois rocheuses de 300m se resserrent dans un canyon étroit, paradis de l'escalade.",
                "جدران صخرية شاهقة يصل ارتفاعها إلى 300 متر تضيق في واد ضيق، جنة لتسلق الصخور.",
                "https://images.unsplash.com/photo-1620259738852-8f7a29cb5e0d?w=1200&q=80",
                "Oct–Apr", 3, 8, 9, true, false, 4.8, 2140],
            [7, "Casablanca", "Casablanca", "الدار البيضاء", "casablanca", "city", "Casablanca-Settat", 33.5731, -7.5898,
                "Morocco's economic capital blends Art Deco boulevards with the Hassan II Mosque.",
                "La capitale économique du Maroc mêle boulevards Art Déco et Mosquée Hassan II.",
                "العاصمة الاقتصادية للمغرب تمزج بين شوارع آرت ديكو ومسجد الحسن الثاني.",
                "https://images.unsplash.com/photo-1553603227-b3fbf9d31e4d?w=1200&q=80",
                "Year-round", 8, 8, 5, false, true, 4.4, 9800],
            [8, "Ait Ben Haddou", "Aït Ben Haddou", "آيت بن حدو", "ait-ben-haddou", "monument", "Drâa-Tafilalet", 31.0472, -7.1319,
                "A UNESCO-listed fortified ksar of earthen clay towers rising from the pre-Saharan plains.",
                "Un ksar fortifié classé UNESCO, décor de Gladiator et Game of Thrones.",
                "قصر محصن مصنف في اليونيسكو، شكّل خلفية لأفلام مثل Gladiator وGame of Thrones.",
                "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=1200&q=80",
                "Mar–May, Sep–Nov", 6, 9, 8, true, false, 4.8, 4120],
            [9, "Tangier", "Tanger", "طنجة", "tangier", "city", "Tanger-Tétouan-Al Hoceïma", 35.7595, -5.8340,
                "Where the Mediterranean meets the Atlantic, Tangier's whitewashed medina once drew Matisse and Burroughs.",
                "Là où la Méditerranée rencontre l'Atlantique, la médina blanche de Tanger a séduit Matisse.",
                "حيث يلتقي البحر الأبيض المتوسط بالمحيط الأطلسي، جذبت مدينة طنجة البيضاء فنانين كبار.",
                "https://images.unsplash.com/photo-1597212720194-d0620c9a3e58?w=1200&q=80",
                "Apr–Oct", 6, 8, 6, false, true, 4.5, 6300],
            [10, "Rabat", "Rabat", "الرباط", "rabat", "city", "Rabat-Salé-Kénitra", 34.0209, -6.8417,
                "Morocco's stately capital pairs the Hassan Tower and Chellah necropolis with a laid-back kasbah.",
                "La capitale du Maroc marie la Tour Hassan et la nécropole de Chellah.",
                "عاصمة المغرب تجمع بين صومعة حسان ومقبرة شالة.",
                "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&q=80",
                "Year-round", 5, 9, 7, false, true, 4.5, 5100],
            [11, "Agadir", "Agadir", "أكادير", "agadir", "beach", "Souss-Massa", 30.4278, -9.5981,
                "A rebuilt modern resort city with 10km of sandy beach and year-round sun.",
                "Une ville balnéaire moderne avec 10km de plage de sable et un soleil toute l'année.",
                "مدينة سياحية حديثة بشاطئ رملي يمتد 10 كلم وشمس على مدار السنة.",
                "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80",
                "Year-round", 6, 8, 6, false, true, 4.3, 4700],
            [12, "Ouzoud Falls", "Cascades d'Ouzoud", "شلالات أوزود", "ouzoud-falls", "mountain", "Marrakech-Safi", 32.0011, -6.7186,
                "A 110m tiered waterfall in the Atlas foothills where wild Barbary macaques roam.",
                "Une cascade en gradins de 110m dans les contreforts de l'Atlas.",
                "شلال متدرج يبلغ ارتفاعه 110 أمتار عند سفوح الأطلس.",
                "https://images.unsplash.com/photo-1583244685026-d8519b5e2588?w=1200&q=80",
                "Mar–Jun", 4, 8, 9, true, false, 4.7, 1980],
        ];

        foreach ($rows as $r) {
            Destination::create([
                'id' => $r[0], 'name_en' => $r[1], 'name_fr' => $r[2], 'name_ar' => $r[3],
                'slug' => $r[4], 'type' => $r[5], 'region' => $r[6],
                'latitude' => $r[7], 'longitude' => $r[8],
                'description_en' => $r[9], 'description_fr' => $r[10], 'description_ar' => $r[11],
                'cover_image' => $r[12], 'best_season' => $r[13],
                'avg_crowd_level' => $r[14], 'safety_score' => $r[15], 'sustainability_score' => $r[16],
                'hidden_gem' => $r[17], 'wc2030_venue' => $r[18],
                'rating' => $r[19], 'review_count' => $r[20],
            ]);
        }
    }
}
