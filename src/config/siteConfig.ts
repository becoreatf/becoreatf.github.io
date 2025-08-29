export interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  avatar?: string;
  isMentor?: boolean;
  linkedin?: string;
  email?: string;
  website?: string;
  specialties?: string[];
}

export interface ResearchArea {
  name: string;
  title: string;
  description: string;
  icon: string;
  methodology: string;
  keyFindings: string[];
  software: string[];
  findings: string;
  conclusion: string;
  results: string;
}

export interface ResearchConfig {
  title: string;
  description: string;
  areas: ResearchArea[];
  projectScope: {
    title: string;
    description: string;
    highlights: string[];
  };
  conclusions: {
    title: string;
    items: string[];
  };
}





export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'image' | 'video';
}

export interface SiteConfig {
  // Genel Site Bilgileri
  siteName: string;
  projectName: string;
  tagline: string;
  description: string;
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    typewriterSlogans: string[];
    badges: string[];
    ctaButtons: Array<{ text: string; href: string; variant: 'primary' | 'secondary' }>;
  };
  
  // Proje Özeti
  summary: {
    title: string;
    cards: {
      problem: { title: string; content: string };
      solution: { title: string; content: string };
      impact: { title: string; content: string };
    };
    description: string;
    highlights: string[];
  };
  
  // Araştırma & Analiz
  research: ResearchConfig;
  
  // Ekip
  team: {
    title: string;
    members: TeamMember[];
    mentor?: {
      name: string;
      title: string;
      institution: string;
    };
  };
  
  // Galeri
  gallery: {
    title: string;
    description?: string;
    items: GalleryItem[];
  };
  
  // İletişim
  contact: {
    title: string;
    description: string;
    email: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
    location: string;
    institution: string;
    form: {
      title: string;
      subtitle: string;
      fields: {
        name: { label: string; placeholder: string };
        email: { label: string; placeholder: string };
        subject: { label: string; placeholder: string };
        message: { label: string; placeholder: string };
      };
      submitButton: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  
  // Footer
  footer: {
    description: string;
    links: {
      title: string;
      items: { text: string; href: string }[];
    }[];
    copyright: string;
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

export const siteConfig: SiteConfig = {
  siteName: "BeCore ATF",
  projectName: "BeCore",
  tagline: "UO₂–UBe₁₃ Katkılı Kaza Toleranslı Yakıt",
  description: "BeCore, berilyum katkılı yenilikçi ATF konseptiyle nükleer güvenliği ve verimliliği artırmayı hedefleyen yerli bir yakıt tasarımıdır.",
  
  hero: {
    title: "BeCore — UO₂–UBe₁₃ ATF",
    subtitle: "Türkiye’de geliştirilen özgün, güvenli ve yenilikçi nükleer yakıt tasarımı",
    typewriterSlogans: [
      "Kaza Toleranslı Yakıt Çözümü",
      "Yüksek Termal İletkenlik",
      "SMR Uyumlu Yenilikçi Tasarım"
    ],
    badges: ["UO₂–UBe₁₃", "ATF Konsepti", "SMR Uyumlu", "Yüksek Güvenlik"],
    ctaButtons: [
      { text: "Proje Özeti", href: "#summary", variant: "primary" },
      { text: "Araştırma", href: "#research", variant: "secondary" }
    ]
  },
  
  summary: {
    title: "Proje Özeti",
    cards: {
      problem: {
        title: "Problem",
        content:
          "Geleneksel UO₂–Zr yakıt sistemleri yüksek sıcaklıklarda hidrojen üretimi ve düşük termal iletkenlik nedeniyle güvenlik riski taşır."
      },
      solution: {
        title: "Çözüm",
        content:
          "BeCore, UO₂ matrisine UBe₁₃ katkısı ile geliştirilmiş ATF konsepti sunar. Yüksek ısıl iletkenlik, düşük oksijen salımı ve güvenli kaza davranışı sağlar."
      },
      impact: {
        title: "Etki",
        content:
          "SMR ve MMR tasarımlarına uygun, yerlileştirilmiş yeni bir yakıt çözümü. Güvenlik marjında artış ve ekonomik verimlilik."
      }
    },
    description:
      "BeCore ATF yakıtı, UO₂–UBe₁₃ kompoziti ile termal iletkenlik ve nötronik performansı iyileştirerek kaza toleransını artırır. NuScale SMR modeli üzerinde Serpent ve COBRA-IV ile yapılan analizler, güvenlik ve verimlilik açısından konseptin uygulanabilir olduğunu göstermektedir.",
    highlights: [
      "UBe₁₃ katkısıyla termal iletkenlik artışı",
      "Nötronik kararlılık ve yüksek yanma performansı",
      "Düşük oksijen/hidrojen üretimi",
      "Kritiklik ve reaktivite güvenliği",
      "Yerli teknoloji altyapısına uyum",
      "HI-STORM: 5 yıl soğutma sonrası 24 demet için 9.31 kW ısı"
    ]
  },
  
  research: {
    title: "Araştırma & Analiz Çalışmaları",
    description: "UO₂–UBe₁₃ ATF konseptimiz, kapsamlı disiplinlerarası analizlerle değerlendirilmiştir. NuScale SMR modeli üzerinde gerçekleştirilen nötronik, termohidrolik, güvenlik ve atık yönetimi analizleri, yakıtın uygulanabilirliğini kanıtlamıştır.",
    areas: [
      {
        name: "Nötronik Performans Analizi",
        title: "Nötronik Performans Analizi",
        description: "UBe₁₃ katkısının reaktivite ve çoğalma faktörü üzerine etkilerinin incelenmesi",
        icon: "atom",
        methodology: "SERPENT Monte Carlo kodu ile birim hücre ve kanal modellemeleri gerçekleştirildi",
        keyFindings: [
          "UBe₁₃ nötronik açıdan kayıp oluşturmamaktadır",
          "Zenginlik ihtiyacı doğurmayarak maliyet avantajı sağlar",
          "Çoklu zenginlik değerleriyle tutarlı davranış sergiler",
          "Farklı reaktör tiplerinde uygulanabilirlik potansiyeli"
        ],
        software: ["SERPENT Monte Carlo", "MCNP", "Geometry Modeling"],
        findings: "UBe₁₃ nötronik açıdan kayıp oluşturmamaktadır ve zenginlik ihtiyacı doğurmayarak maliyet avantajı sağlar.",
        conclusion: "UO₂–UBe₁₃ yakıtı, geleneksel UO₂ yakıtına kıyasla nötronik kayıp olmadan gelişmiş performans sunmaktadır.",
        results: "UO₂–UBe₁₃ yakıtı, geleneksel UO₂ yakıtına kıyasla nötronik kayıp olmadan gelişmiş performans sunmaktadır."
      },
      {
        name: "Termohidrolik & Isı Transfer",
        title: "Termohidrolik & Isı Transfer",
        description: "Yakıt merkez sıcaklığı ve ısıl iletkenlik özelliklerinin analizi",
        icon: "thermometer",
        methodology: "COBRA-IV/TF alt kanal analiz kodu ile NuScale geometrisi modellenmiştir",
        keyFindings: [
          "UBe₁₃ katkısı ile yakıt merkez sıcaklığı belirgin şekilde düşürülmüştür",
          "Özgül ısı kapasitesi artışı ile ani güç değişimlerine karşı kararlılık",
          "Maxwell-Eucken modeli ile ısıl iletkenlik %20-30 artış",
          "Reaktivite giriş kazalarında gelişmiş tolerans"
        ],
        software: ["COBRA-IV/TF", "COBRA-TF", "ZEBRA", "CFD Analysis"],
        findings: "UBe₁₃ katkısı ile yakıt merkez sıcaklığı belirgin şekilde düşürülmüştür ve Maxwell-Eucken modeli ile ısıl iletkenlik %20-30 artış gözlenmiştir.",
        conclusion: "Berilyumun yüksek ısıl iletkenliği sayesinde yakıt güvenlik marjları önemli ölçüde artırılmıştır.",
        results: "Berilyumun yüksek ısıl iletkenliği sayesinde yakıt güvenlik marjları önemli ölçüde artırılmıştır."
      },
      {
        name: "Güvenlik & Kaza Analizi",
        title: "Güvenlik & Kaza Analizi",
        description: "Akış azalması ve reaktivite kazası senaryolarının değerlendirilmesi",
        icon: "shield",
        methodology: "COBRA-TF ile kaza modellemesi ve güvenlik analizi yapılmıştır",
        keyFindings: [
          "Değişen güç profiline karşı gelişmiş tolerans",
          "Kritik ısı akısı (CHF) performansında iyileşme",
          "UO₂ ile termal uyumluluk ve yapısal kararlılık",
          "Fisyon gazı salınımında azalma"
        ],
        software: ["COBRA-TF", "RELAP5", "Safety Analysis Codes"],
        findings: "Değişen güç profiline karşı gelişmiş tolerans ve kritik ısı akısı (CHF) performansında iyileşme gözlenmiştir.",
        conclusion: "UBe₁₃ katkılı yakıt, kaza koşullarında geleneksel yakıta göre daha güvenli davranış sergilemektedir.",
        results: "UBe₁₃ katkılı yakıt, kaza koşullarında geleneksel yakıta göre daha güvenli davranış sergilemektedir."
      },
      {
        name: "Atık Yönetimi & Çevresel Etki",
        title: "Atık Yönetimi & Çevresel Etki",
        description: "Kullanılmış yakıt depolama ve radyolojik yayılım analizi",
        icon: "archive",
        methodology: "HI-STORM kuru depolama sistemi TRIPOLI-4 ile modellenmiş, JRODOS ile meteorolojik yayılım simülasyonu yapılmıştır",
        keyFindings: [
          "5 yıl soğutma sonrası 24 demet için 9.31 kW bozunma ısısı",
          "Doz hızları IAEA limitlerinin altında kalarak güvenli depolama",
          "Etkin doz değerlerinde %10 artış (2.95×10⁴ vs 2.66×10⁴ mSv)",
          "Birikim değerlerinde artış (3.83×10⁹ vs 3.45×10⁹ Bq/m²)"
        ],
        software: ["TRIPOLI-4", "KORIGEN", "HI-STORM Modeling", "JRODOS"],
        findings: "5 yıl soğutma sonrası 24 demet için 9.31 kW bozunma ısısı ve doz hızları IAEA limitlerinin altında kalarak güvenli depolama sağlanmıştır.",
        conclusion: "UBe₁₃ yakıtı mevcut depolama sistemleriyle uyumlu olup, çevresel etki açısından kontrollü artış gözlenmiş, ek güvenlik önlemleri belirlenmiştir.",
        results: "UBe₁₃ yakıtı mevcut depolama sistemleriyle uyumlu olup, çevresel etki açısından kontrollü artış gözlenmiş, ek güvenlik önlemleri belirlenmiştir."
      }
    ],
    projectScope: {
      title: "Proje Kapsamı & Model Seçimi",
      description: "NuScale US600 SMR modeli referans alınarak kapsamlı analiz gerçekleştirilmiştir",
      highlights: [
        "160 MWt çekirdek termal gücü",
        "12.76 MPa sistem basıncı",
        "37 yakıt demeti, 17x17 tasarım",
        "Doğal konveksiyonlu pasif soğutma",
        "PWR tabanlı güvenilir teknoloji"
      ]
    },
    conclusions: {
      title: "Sonuçlar & Değerlendirme",
      items: [
        "UBe₁₃ katkısı nötronik kayıp olmadan termal performansı önemli ölçüde artırmaktadır",
        "Yakıt güvenlik marjları kaza toleranslı yakıt (ATF) kriterlerini karşılamaktadır",
        "Maxwell-Eucken modeli ile hesaplanan ısıl iletkenlik artışı deneysel doğrulama gerektirmektedir",
        "Atık yönetimi açısından mevcut altyapılar kullanılabilir, ek önlemler planlanmalıdır",
        "Çevresel etki artışı kontrollü seviyede olup, geliştirilmiş güvenlik protokolleri yeterlidir",
        "Yerli teknoloji geliştirme açısından potansiyel taşımaktadır"
      ]
    }
  },
  

  
  team: {
    title: "BeCore Ekibimiz",
    members: [
      {
        name: "Ahmet Kaan Mercan",
        role: "Danışman",
        expertise: "Nükleer Kazalar, Ciddi Kazalar Fenomeni, Radyolojik Dağılım ve Radyolojik Etki Modelleri, Alt Kanal Analizleri, Nükleer Güvenlik Analizleri",
        avatar: "/src/assets/images/ahmet.png",
        linkedin: "https://www.linkedin.com/in/ahmet-ka%C4%9Fan-mercan-188577140",
        specialties: ["Doktora: KIT Almanya", "KORIGEN & JRODOS", "Monte Carlo Simülasyonları"]
      },
      {
        name: "Furkan Sezgin Öztürk",
        role: "Kaptan",
        expertise: "Termohidrolik ve Alt Kanal Analizleri, Radyasyon Zırhlama, Nötronik Analiz, Nükleer Yakıt Performans Analizi, Görüntü Analizi",
        avatar: "/src/assets/images/furkan.png",
        linkedin: "https://www.linkedin.com/in/furkan-sezgin-öztürk-1149a9209",
        specialties: ["COBRA-IV, COBRA-TF, ZEBRA", "Tripoli-4, Serpent", "FINIX, Python, C"]
      },
      {
        name: "Nurettin Serhat Evren",
        role: "Reaktör Fiziği",
        expertise: "Termohidrolik ve Alt Kanal Analizleri, Radyasyon Zırhlama, Nötronik Analiz, Görüntü Analizi, Teknik Çizim",
        avatar: "/src/assets/images/nurettin.png",
        linkedin: "https://www.linkedin.com/in/nurettin-serhat-evren-a68103229",
        specialties: ["COBRA-IV, COBRA-TF, ZEBRA", "Tripoli-4, Serpent", "Python, C, Java, 3D Max"]
      },
      {
        name: "Çağrı Kaan Sönmez",
        role: "Termohidrolik ve Isı Analizi",
        expertise: "Termohidrolik ve Alt Kanal Analizleri, Radyasyon Zırhlama, Reaktör Kinetiği ve Kontrolü",
        avatar: "/src/assets/images/cagri.png",
        linkedin: "https://www.linkedin.com/in/çağrı-kaan-sönmez-a49172280",
        specialties: ["COBRA-4, COBRA-TF, ZEBRA", "Tripoli-4", "Simulink"]
      },
      {
        name: "Kaan Koç",
        role: "Yazılım ve Otomasyon",
        expertise: "Termohidrolik ve Alt Kanal Analizleri, Nötronik Analiz, Yazılım Geliştirme, Mobil Uygulama Geliştirme, Web Arayüz Tasarımı",
        avatar: "/src/assets/images/kaan.png",
        linkedin: "https://www.linkedin.com/in/xkaankoc",
        website: "https://khankoc.github.io",
        specialties: ["Python, Dart, Flutter", "HTML, CSS, JavaScript", "ZEBRA, Serpent"]
      },
      {
        name: "Umut Sağır",
        role: "Nükleer Yakıt Malzemeleri",
        expertise: "Gelişmiş Yakıt Tasarımları, Radyolojik Dağılımın Karşılaştırmalı Analizi, Nötronik Analiz, Görüntü Analizi, Teknik Çizim",
        avatar: "/src/assets/images/umut.png",
        linkedin: "https://www.linkedin.com/in/umut-sa%C4%9F%C4%B1r-069525230",
        specialties: ["KORIGEN & JRODOS", "Serpent", "Novisim, ImageJ, AutoCAD"]
      },
      {
        name: "Bahar Muşluoğlu",
        role: "Nükleer Yakıt Malzemeleri",
        expertise: "Gelişmiş Yakıt Tasarımları, Radyolojik Dağılımın Karşılaştırmalı Analizi, Görüntü Analizi, Teknik Çizim, Nötronik Analiz",
        avatar: "/src/assets/images/bahar.png",
        linkedin: "https://www.linkedin.com/in/bahar-mu%C5%9Fluo%C4%9Flu-a33b041b2",
        specialties: ["KORIGEN & JRODOS", "Novisim, ImageJ", "AutoCAD, Serpent", "MATLAB"]
      },
      {
        name: "Betül Karcan",
        role: "Reaktör Güvenliği",
        expertise: "Radyolojik Dağılımın Karşılaştırmalı Analizi, Termohidrolik ve Alt Kanal Analizleri, Nötronik Analiz, Kodlama",
        avatar: "/src/assets/images/betul.png",
        linkedin: "https://www.linkedin.com/in/betulkarcan",
        specialties: ["KORIGEN & JRODOS", "COBRA-IV, COBRA-TF, ZEBRA", "Serpent, Python, MATLAB"]
      }
    ]
  },
  

  
  gallery: {
    title: "Galeri & Demo",
    description: "Analiz çıktılarımız ve modelleme örnekleri. SiC/Cr kaplama gibi klasik ATF alternatifleriyle kıyaslarda UO₂–UBe₁₃ konseptinin avantajlarını görselleştiriyoruz.",
    items: [
      {
        id: "simulation-1",
        title: "SERPENT Nötronik Analizi",
        description:
          "UO₂ ve UO₂–UBe₁₃ yakıtları için çoğalma faktörü ve reaktivite sonuçları",
        image: "/images/serpent-simulation.jpg",
        type: "image"
      },
      {
        id: "thermal-1",
        title: "COBRA-IV Termal Analiz",
        description:
          "NuScale SMR kanalı üzerinde yakıt merkez/surface sıcaklık karşılaştırmaları",
        image: "/images/cobra-analysis.jpg",
        type: "image"
      },
      {
        id: "storage-1",
        title: "HI-STORM Depolama",
        description:
          "TRIPOLI-4 ile gama doz oranlarının incelenmesi ve güvenlik analizi",
        image: "/images/historm-storage.jpg",
        type: "image"
      },
      {
        id: "accident-1",
        title: "JRODOS Kaza Yayılımı",
        description:
          "UO₂–UBe₁₃ yakıtı için olası kaza senaryolarında radyolojik dağılım",
        image: "/images/jrodos-accident.jpg",
        type: "image"
      }
    ]
  },
  
  contact: {
    title: "İletişim",
    description:
      "BeCore ekibiyle Teknofest, akademik işbirlikleri veya endüstriyel projeler için iletişime geçebilirsiniz.",
    email: "becore@teknofest.edu.tr",
    socialLinks: {
      github: "https://github.com/becore-atf",
      linkedin: "https://linkedin.com/company/becore-atf"
    },
    location: "Türkiye",
    institution: "BeCore — Başvuru ID: 3634262",
    form: {
      title: "Mesaj Gönderin",
      subtitle: "Projelerimiz hakkında bilgi almak veya işbirliği teklifinde bulunmak için bizimle iletişime geçin.",
      fields: {
        name: { label: "Ad Soyad", placeholder: "Adınızı ve soyadınızı girin" },
        email: { label: "E-posta", placeholder: "E-posta adresinizi girin" },
        subject: { label: "Konu", placeholder: "Mesaj konusunu girin" },
        message: { label: "Mesaj", placeholder: "Mesajınızı buraya yazın..." }
      },
      submitButton: "Mesaj Gönder",
      successMessage: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
      errorMessage: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
    }
  },
  
  footer: {
    description: "BeCore, Türkiye'de geliştirilen özgün, güvenli ve yenilikçi nükleer yakıt tasarımıdır.",
    links: [
      {
        title: "Proje",
        items: [
          { text: "Özet", href: "#summary" },
          { text: "Araştırma", href: "#research" },
          { text: "Ekip", href: "#team" },
          { text: "Galeri", href: "#gallery" }
        ]
      },
      {
        title: "İletişim",
        items: [
          { text: "Mesaj Gönder", href: "#contact" },
          { text: "LinkedIn", href: "https://linkedin.com/company/becore-atf" },
          { text: "GitHub", href: "https://github.com/becore-atf" }
        ]
      }
    ],
    copyright: "© 2024 BeCore ATF. Tüm hakları saklıdır."
  },
  
  seo: {
    title: "BeCore ATF - UO₂–UBe₁₃ Katkılı Kaza Toleranslı Yakıt | Teknofest 2025",
    description:
      "UO₂–UBe₁₃ ATF konsepti; SERPENT nötronik, COBRA-IV/TF termohidrolik, TRIPOLI-4 HI-STORM kuru depolama ve JRODOS yayılım analizleriyle değerlendirildi.",
    keywords: [
      "ATF",
      "UO2-UBe13",
      "nükleer yakıt",
      "kaza toleranslı yakıt",
      "SMR",
      "nükleer güvenlik",
      "HI-STORM",
      "JRODOS",
      "TRIPOLI-4",
      "Serpent",
      "COBRA-IV"
    ],
    ogImage: "/images/becore-og-image.jpg"
  }
};
