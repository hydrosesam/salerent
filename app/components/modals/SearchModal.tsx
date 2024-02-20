"use client";
import qs from "query-string";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import Search from "../navbar/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
import { getRandomValues } from "crypto";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

import { SafeListing } from "@/app/types";
import axios from "axios";
import Select from "react-select";

enum STEPS {
  TYPE = 0,
  INFO = 1,
}
interface Location {
  location: string;
  pincode: number;
}
interface Option {
  value: string;
  label: string;
}

const locations: Location[] = [
  {
    location: "Aimurikara",
    pincode: 683544,
  },
  {
    location: "Airapuram",
    pincode: 683541,
  },
  {
    location: "Airoopadam",
    pincode: 686692,
  },
  {
    location: "Airoor",
    pincode: 683579,
  },
  {
    location: "Alangad",
    pincode: 683511,
  },
  {
    location: "Alattuchira",
    pincode: 683544,
  },
  {
    location: "Allapra",
    pincode: 683553,
  },
  {
    location: "Aluva",
    pincode: 683101,
  },
  {
    location: "Aluva Bazar",
    pincode: 683101,
  },
  {
    location: "Aluva Town bus stand",
    pincode: 683101,
  },
  {
    location: "Aluva-asokapuram",
    pincode: 683101,
  },
  {
    location: "Ambalamedu",
    pincode: 682303,
  },
  {
    location: "Ambalamugal",
    pincode: 682302,
  },
  {
    location: "Amballur",
    pincode: 682315,
  },
  {
    location: "Anappara-kalady",
    pincode: 683581,
  },
  {
    location: "Anchelpetty",
    pincode: 686667,
  },
  {
    location: "Andikkadavu",
    pincode: 682008,
  },
  {
    location: "Angamally",
    pincode: 683572,
  },
  {
    location: "Angamally South",
    pincode: 683573,
  },
  {
    location: "Arakunnam",
    pincode: 682313,
  },
  {
    location: "Arakuzha",
    pincode: 686672,
  },
  {
    location: "Aruvappara",
    pincode: 683545,
  },
  {
    location: "Asamannoor",
    pincode: 683549,
  },
  {
    location: "Athani",
    pincode: 683585,
  },
  {
    location: "Avoly",
    pincode: 686677,
  },
  {
    location: "Ayavana",
    pincode: 686676,
  },
  {
    location: "Ayyampilly",
    pincode: 682501,
  },
  {
    location: "Ayyampuzha",
    pincode: 683581,
  },
  {
    location: "Azhakam",
    pincode: 683577,
  },
  {
    location: "Azheekal",
    pincode: 682510,
  },
  {
    location: "Banerji Road",
    pincode: 682018,
  },
  {
    location: "Bhaktanandapuram",
    pincode: 682308,
  },
  {
    location: "Bhoothathankettu",
    pincode: 686691,
  },
  {
    location: "Binanipuram",
    pincode: 683502,
  },
  {
    location: "Brahmapuram",
    pincode: 682303,
  },
  {
    location: "Changampuzha Nagar",
    pincode: 682033,
  },
  {
    location: "Chathamattam",
    pincode: 686671,
  },
  {
    location: "Chelad Junction",
    pincode: 686681,
  },
  {
    location: "Chellanam",
    pincode: 682008,
  },
  {
    location: "Chendamangalam",
    pincode: 683512,
  },
  {
    location: "Chengamanad",
    pincode: 683578,
  },
  {
    location: "Cherai",
    pincode: 683514,
  },
  {
    location: "Cheranalloor(pbr)",
    pincode: 683544,
  },
  {
    location: "Cheranallur",
    pincode: 682034,
  },
  {
    location: "Cheruvattoor",
    pincode: 686691,
  },
  {
    location: "Chethicode",
    pincode: 682315,
  },
  {
    location: "Chittoor-ekm",
    pincode: 682027,
  },
  {
    location: "Choondakuzhy",
    pincode: 683546,
  },
  {
    location: "Chottanikkara",
    pincode: 682312,
  },
  {
    location: "Chowara",
    pincode: 683571,
  },
  {
    location: "Chully",
    pincode: 683581,
  },
  {
    location: "CSEZ",
    pincode: 682037,
  },
  {
    location: "Desom",
    pincode: 683102,
  },
  {
    location: "Dry Dock",
    pincode: 682029,
  },
  {
    location: "Edakkattuvayal",
    pincode: 682313,
  },
  {
    location: "Edakochi",
    pincode: 682006,
  },
  {
    location: "Edapally",
    pincode: 682024,
  },
  {
    location: "Edapally North",
    pincode: 682024,
  },
  {
    location: "Edathala",
    pincode: 683561,
  },
  {
    location: "Edathala North",
    pincode: 683564,
  },
  {
    location: "Edavanakad",
    pincode: 682502,
  },
  {
    location: "Edavoor",
    pincode: 683544,
  },
  {
    location: "Edayar",
    pincode: 686662,
  },
  {
    location: "Elamakkara",
    pincode: 682026,
  },
  {
    location: "Elamkunnapuzha",
    pincode: 682503,
  },
  {
    location: "Elanji",
    pincode: 686665,
  },
  {
    location: "Elanthikara",
    pincode: 683594,
  },
  {
    location: "Elavoor",
    pincode: 683572,
  },
  {
    location: "Enanalloor",
    pincode: 686673,
  },
  {
    location: "Ernakulam",
    pincode: 682011,
  },
  {
    location: "Ernakulam College",
    pincode: 682035,
  },
  {
    location: "Ernakulam High court",
    pincode: 682031,
  },
  {
    location: "Ernakulam Hindi prachar sabha",
    pincode: 682016,
  },
  {
    location: "Ernakulam North",
    pincode: 682018,
  },
  {
    location: "Eroor",
    pincode: 682306,
  },
  {
    location: "Eroor South",
    pincode: 682306,
  },
  {
    location: "Eroor West",
    pincode: 682306,
  },
  {
    location: "Erumathala",
    pincode: 683112,
  },
  {
    location: "Ezhakkaranad",
    pincode: 682308,
  },
  {
    location: "Ezhakkaranadu South",
    pincode: 682308,
  },
  {
    location: "Ezhattumugham",
    pincode: 683577,
  },
  {
    location: "Ezhikkara",
    pincode: 683513,
  },
  {
    location: "Gothuruthy",
    pincode: 683516,
  },
  {
    location: "Hmt Colony",
    pincode: 683503,
  },
  {
    location: "Idamalayar",
    pincode: 686691,
  },
  {
    location: "Illambakapalli",
    pincode: 683544,
  },
  {
    location: "Inchathotty",
    pincode: 686691,
  },
  {
    location: "Iramalloor",
    pincode: 686691,
  },
  {
    location: "Irimbanam",
    pincode: 682309,
  },
  {
    location: "Iringole",
    pincode: 683548,
  },
  {
    location: "Kadakkanad",
    pincode: 682311,
  },
  {
    location: "Kadalikkad",
    pincode: 686670,
  },
  {
    location: "Kadamakudi",
    pincode: 682027,
  },
  {
    location: "Kadamattam",
    pincode: 682311,
  },
  {
    location: "Kadavanthara",
    pincode: 682020,
  },
  {
    location: "Kadavoor",
    pincode: 686671,
  },
  {
    location: "Kadayirippu",
    pincode: 682311,
  },
  {
    location: "Kadungamangalam",
    pincode: 682305,
  },
  {
    location: "Kaipatoor",
    pincode: 682313,
  },
  {
    location: "Kaitharam",
    pincode: 683519,
  },
  {
    location: "Kakkad",
    pincode: 686664,
  },
  {
    location: "Kakkanad",
    pincode: 682030,
  },
  {
    location: "Kakkanad West",
    pincode: 682030,
  },
  {
    location: "Kakkoor",
    pincode: 686662,
  },
  {
    location: "Kalady",
    pincode: 683574,
  },
  {
    location: "Kalady Plantation",
    pincode: 683583,
  },
  {
    location: "Kalamassery",
    pincode: 683104,
  },
  {
    location: "Kalamassery Development plot",
    pincode: 683109,
  },
  {
    location: "Kalampoor",
    pincode: 686664,
  },
  {
    location: "Kalloorkkad",
    pincode: 686668,
  },
  {
    location: "Kaloor",
    pincode: 686668,
  },
  {
    location: "Kanayannoor",
    pincode: 682312,
  },
  {
    location: "Kandanad",
    pincode: 682305,
  },
  {
    location: "Kaninad",
    pincode: 682310,
  },
  {
    location: "Kanjoor",
    pincode: 683575,
  },
  {
    location: "Kanjiramattom",
    pincode: 682315,
  },
  {
    location: "Kannamali",
    pincode: 682008,
  },
  {
    location: "Karamala",
    pincode: 686662,
  },
  {
    location: "Karimpana",
    pincode: 686662,
  },
  {
    location: "Karimugal",
    pincode: 682303,
  },
  {
    location: "Karukadom",
    pincode: 686691,
  },
  {
    location: "Karukappilli",
    pincode: 682311,
  },
  {
    location: "Karukutty",
    pincode: 683576,
  },
  {
    location: "Karumalloor",
    pincode: 683511,
  },
  {
    location: "Kavakkad",
    pincode: 686668,
  },
  {
    location: "Keerampara",
    pincode: 686691,
  },
  {
    location: "Keezhillam",
    pincode: 683541,
  },
  {
    location: "Kidangoor",
    pincode: 683572,
  },
  {
    location: "Kinginimattom",
    pincode: 682311,
  },
  {
    location: "Kizhakkambalam",
    pincode: 683562,
  },
  {
    location: "Kizhakompu",
    pincode: 686662,
  },
  {
    location: "Kizhmuri",
    pincode: 686663,
  },
  {
    location: "Kochi",
    pincode: 682001,
  },
  {
    location: "Kochi Airport",
    pincode: 683111,
  },
  {
    location: "Kochi M.g.road",
    pincode: 682016,
  },
  {
    location: "Kochi Naval base",
    pincode: 682004,
  },
  {
    location: "Kochi Palace",
    pincode: 682301,
  },
  {
    location: "Kochi University",
    pincode: 682022,
  },
  {
    location: "Kodanad",
    pincode: 683544,
  },
  {
    location: "Kokkappilly",
    pincode: 682305,
  },
  {
    location: "Kolenchery",
    pincode: 682311,
  },
  {
    location: "Kombanad",
    pincode: 683546,
  },
  {
    location: "Kongorpilly",
    pincode: 683518,
  },
  {
    location: "Koonammavu",
    pincode: 683518,
  },
  {
    location: "Koothattukulam",
    pincode: 686662,
  },
  {
    location: "Koovalloor",
    pincode: 686671,
  },
  {
    location: "Koovappady",
    pincode: 683544,
  },
  {
    location: "Koovappara",
    pincode: 686691,
  },
  {
    location: "Kothad",
    pincode: 682027,
  },
  {
    location: "Kothamangalam",
    pincode: 686691,
  },
  {
    location: "Kothamangalam Bazar",
    pincode: 686691,
  },
  {
    location: "Kothamangalam College",
    pincode: 686666,
  },
  {
    location: "Kottappady",
    pincode: 686695,
  },
  {
    location: "Kottuvally",
    pincode: 683519,
  },
  {
    location: "Kozhipilly",
    pincode: 686691,
  },
  {
    location: "Kulayettikara",
    pincode: 682315,
  },
  {
    location: "Kumarapuram",
    pincode: 683565,
  },
  {
    location: "Kumbalam",
    pincode: 682506,
  },
  {
    location: "Kumbalangi",
    pincode: 682007,
  },
  {
    location: "Kumbalangi South",
    pincode: 682007,
  },
  {
    location: "Kunjithai",
    pincode: 683522,
  },
  {
    location: "Kunnackal",
    pincode: 682316,
  },
  {
    location: "Kunnukara",
    pincode: 683524,
  },
  {
    location: "Kureekad",
    pincode: 682305,
  },
  {
    location: "Kurumassery",
    pincode: 683579,
  },
  {
    location: "Kuruppampady",
    pincode: 683545,
  },
  {
    location: "Kusumagiri",
    pincode: 682030,
  },
  {
    location: "Kuthiathode(ekm)",
    pincode: 683594,
  },
  {
    location: "Kuthukuzhy",
    pincode: 686691,
  },
  {
    location: "Kuttampuzha",
    pincode: 686691,
  },
  {
    location: "Kuttikkattukara",
    pincode: 683501,
  },
  {
    location: "Kuzhiyara",
    pincode: 682312,
  },
  {
    location: "Madakkathanam",
    pincode: 686670,
  },
  {
    location: "Malayattoor",
    pincode: 683587,
  },
  {
    location: "Malayidumthuruth",
    pincode: 683561,
  },
  {
    location: "Maliankara",
    pincode: 683516,
  },
  {
    location: "Malipara",
    pincode: 686691,
  },
  {
    location: "Malipuram",
    pincode: 682511,
  },
  {
    location: "Mamala",
    pincode: 682305,
  },
  {
    location: "Mamalakandom",
    pincode: 686691,
  },
  {
    location: "Mamalassery",
    pincode: 686663,
  },
  {
    location: "Manary",
    pincode: 686673,
  },
  {
    location: "Manickamangalam",
    pincode: 683574,
  },
  {
    location: "Manidu",
    pincode: 686726,
  },
  {
    location: "Manikinar",
    pincode: 686693,
  },
  {
    location: "Manjapra",
    pincode: 683581,
  },
  {
    location: "Manjummel",
    pincode: 683501,
  },
  {
    location: "Mannam Paravur",
    pincode: 683520,
  },
  {
    location: "Mannathur",
    pincode: 686723,
  },
  {
    location: "Maradu",
    pincode: 682304,
  },
  {
    location: "Marady East",
    pincode: 686673,
  },
  {
    location: "Marampally",
    pincode: 683107,
  },
  {
    location: "Marika",
    pincode: 686662,
  },
  {
    location: "Marithazham",
    pincode: 682315,
  },
  {
    location: "Matsyapuri",
    pincode: 682029,
  },
  {
    location: "Mattancherry",
    pincode: 682002,
  },
  {
    location: "Mattancherry Bazar",
    pincode: 682002,
  },
  {
    location: "Mattancherry Jetty",
    pincode: 682002,
  },
  {
    location: "Mattancherry Town",
    pincode: 682002,
  },
  {
    location: "Mattoor",
    pincode: 683574,
  },
  {
    location: "Mazhuvannoor",
    pincode: 686689,
  },
  {
    location: "Mazhuvannoor South",
    pincode: 686669,
  },
  {
    location: "Meempara",
    pincode: 682308,
  },
  {
    location: "Meenkunnam",
    pincode: 686672,
  },
  {
    location: "Mekkad",
    pincode: 683589,
  },
  {
    location: "Mekkadambu",
    pincode: 682316,
  },
  {
    location: "Memadangu",
    pincode: 686672,
  },
  {
    location: "Methala",
    pincode: 683545,
  },
  {
    location: "Mookkannur",
    pincode: 683577,
  },
  {
    location: "Moothakunnam",
    pincode: 683516,
  },
  {
    location: "Mudakuzha",
    pincode: 683546,
  },
  {
    location: "Mudavoor",
    pincode: 686669,
  },
  {
    location: "Mudikkal",
    pincode: 683547,
  },
  {
    location: "Mulakulam",
    pincode: 686664,
  },
  {
    location: "Mulanthuruthy",
    pincode: 682314,
  },
  {
    location: "Mulavoor",
    pincode: 686673,
  },
  {
    location: "Mulavukad",
    pincode: 682504,
  },
  {
    location: "Mullapuzhachal",
    pincode: 686670,
  },
  {
    location: "Mundamveli",
    pincode: 682507,
  },
  {
    location: "Muppathadam",
    pincode: 683110,
  },
  {
    location: "Mutholapuram",
    pincode: 686665,
  },
  {
    location: "Muvattupuzha",
    pincode: 686661,
  },
  {
    location: "Muvattupuzha Bazar",
    pincode: 686661,
  },
  {
    location: "Muvattupuzha Market",
    pincode: 686673,
  },
  {
    location: "Nadakkavu",
    pincode: 682307,
  },
  {
    location: "Nadukani",
    pincode: 686691,
  },
  {
    location: "Naduvattam",
    pincode: 683574,
  },
  {
    location: "Nagapuzha",
    pincode: 686668,
  },
  {
    location: "Nanthiattukunnam",
    pincode: 683513,
  },
  {
    location: "Narakkal",
    pincode: 682505,
  },
  {
    location: "Naval Armament depot – aluva",
    pincode: 683563,
  },
  {
    location: "Nayarambalam",
    pincode: 682509,
  },
  {
    location: "Nayathode",
    pincode: 683572,
  },
  {
    location: "Nazareth",
    pincode: 682507,
  },
  {
    location: "Nechoor",
    pincode: 686664,
  },
  {
    location: "Nedumbassery",
    pincode: 683585,
  },
  {
    location: "Nedungad",
    pincode: 682509,
  },
  {
    location: "Nedungapra",
    pincode: 683545,
  },
  {
    location: "Neeleeswaram",
    pincode: 683584,
  },
  {
    location: "Neendapara",
    pincode: 686693,
  },
  {
    location: "Neericode",
    pincode: 683511,
  },
  {
    location: "Nellad",
    pincode: 686721,
  },
  {
    location: "Nellikuzhy",
    pincode: 686691,
  },
  {
    location: "Nellimattam",
    pincode: 686693,
  },
  {
    location: "Neriamangalam",
    pincode: 686693,
  },
  {
    location: "Nettoor",
    pincode: 682304,
  },
  {
    location: "Nirmala",
    pincode: 686673,
  },
  {
    location: "Njayapalli",
    pincode: 686691,
  },
  {
    location: "North End",
    pincode: 682009,
  },
  {
    location: "North Piramadom",
    pincode: 686667,
  },
  {
    location: "Ochanthuruth",
    pincode: 682508,
  },
  {
    location: "Okkal",
    pincode: 683550,
  },
  {
    location: "Oliyapuram",
    pincode: 686679,
  },
  {
    location: "Onakkoor",
    pincode: 686667,
  },
  {
    location: "Oonnukal",
    pincode: 686693,
  },
  {
    location: "Ooramana",
    pincode: 686730,
  },
  {
    location: "Pachalam",
    pincode: 682012,
  },
  {
    location: "Paduvapuram",
    pincode: 683582,
  },
  {
    location: "Paingarapilly",
    pincode: 682314,
  },
  {
    location: "Paingattoor",
    pincode: 686671,
  },
  {
    location: "Palakuzha",
    pincode: 686686,
  },
  {
    location: "Palarivattom",
    pincode: 682025,
  },
  {
    location: "Pallarimangalam",
    pincode: 686671,
  },
  {
    location: "Palliport",
    pincode: 683515,
  },
  {
    location: "Palluruthy",
    pincode: 682006,
  },
  {
    location: "Palluruthy South",
    pincode: 682006,
  },
  {
    location: "Pampakuda",
    pincode: 686667,
  },
  {
    location: "Panaikulam",
    pincode: 683511,
  },
  {
    location: "Panampilly Nagar",
    pincode: 682036,
  },
  {
    location: "Panangad",
    pincode: 682506,
  },
  {
    location: "Panayappilly",
    pincode: 682002,
  },
  {
    location: "Pancode",
    pincode: 682310,
  },
  {
    location: "Pandappily",
    pincode: 686672,
  },
  {
    location: "Paniely",
    pincode: 683546,
  },
  {
    location: "Panipra",
    pincode: 686692,
  },
  {
    location: "Parakkadavu",
    pincode: 683579,
  },
  {
    location: "Parappuram",
    pincode: 683593,
  },
  {
    location: "Paravur",
    pincode: 683513,
  },
  {
    location: "Paravur Market",
    pincode: 683513,
  },
  {
    location: "Paravur Town",
    pincode: 683513,
  },
  {
    location: "Pareekanni",
    pincode: 686693,
  },
  {
    location: "Pattimattam",
    pincode: 683562,
  },
  {
    location: "Pazhamthottam",
    pincode: 683565,
  },
  {
    location: "Pazhoor",
    pincode: 686664,
  },
  {
    location: "Periapuram",
    pincode: 686667,
  },
  {
    location: "Peringala",
    pincode: 683565,
  },
  {
    location: "Perumannoor",
    pincode: 686693,
  },
  {
    location: "Perumanur",
    pincode: 682015,
  },
  {
    location: "Perumbadavam",
    pincode: 686665,
  },
  {
    location: "Perumballoor",
    pincode: 686673,
  },
  {
    location: "Perumbavoor",
    pincode: 683542,
  },
  {
    location: "Perumbavoor South",
    pincode: 683542,
  },
  {
    location: "Perumpilly",
    pincode: 682314,
  },
  {
    location: "Pezhakkappilly",
    pincode: 686674,
  },
  {
    location: "Pindimana",
    pincode: 686698,
  },
  {
    location: "Piraroor",
    pincode: 683574,
  },
  {
    location: "Piravom",
    pincode: 686664,
  },
  {
    location: "Pizhala",
    pincode: 682027,
  },
  {
    location: "Plamudi",
    pincode: 686692,
  },
  {
    location: "Ponjassery",
    pincode: 683547,
  },
  {
    location: "Poonithura",
    pincode: 682038,
  },
  {
    location: "Poothotta",
    pincode: 682307,
  },
  {
    location: "Poothrikka",
    pincode: 682308,
  },
  {
    location: "Pooyamkutty",
    pincode: 686691,
  },
  {
    location: "Pothanicaud",
    pincode: 686671,
  },
  {
    location: "Pulickamaly",
    pincode: 682314,
  },
  {
    location: "Pulinthanam",
    pincode: 686671,
  },
  {
    location: "Puliyanam",
    pincode: 683572,
  },
  {
    location: "Pulluvazhi",
    pincode: 683541,
  },
  {
    location: "Puthencruz",
    pincode: 682308,
  },
  {
    location: "Puthenvelikkara",
    pincode: 683594,
  },
  {
    location: "Puthupadi",
    pincode: 686673,
  },
  {
    location: "Puthuvype",
    pincode: 682508,
  },
  {
    location: "Rajagiri",
    pincode: 683104,
  },
  {
    location: "Rajagiri Valley",
    pincode: 682039,
  },
  {
    location: "Ramamangalam",
    pincode: 686663,
  },
  {
    location: "Randar",
    pincode: 686673,
  },
  {
    location: "Rayamangalam",
    pincode: 683545,
  },
  {
    location: "Rayonpuram",
    pincode: 683543,
  },
  {
    location: "S.Aduvassery",
    pincode: 683578,
  },
  {
    location: "S.Chellanam",
    pincode: 682008,
  },
  {
    location: "Shanmugham Road",
    pincode: 682031,
  },
  {
    location: "South Paravoor",
    pincode: 682320,
  },
  {
    location: "South Vazhakulam",
    pincode: 683105,
  },
  {
    location: "Sreemoolanagaram",
    pincode: 683580,
  },
  {
    location: "Thabore",
    pincode: 683577,
  },
  {
    location: "Thaikkattukara",
    pincode: 683106,
  },
  {
    location: "Thalacode",
    pincode: 682314,
  },
  {
    location: "Thalakode",
    pincode: 686693,
  },
  {
    location: "Thammanam",
    pincode: 682032,
  },
  {
    location: "Thathappilly",
    pincode: 683520,
  },
  {
    location: "Thattekkad",
    pincode: 686691,
  },
  {
    location: "Thazhvankunnam",
    pincode: 686668,
  },

  {
    location: "Thrikkakara",
    pincode: 682021,
  },
  {
    location: "Willington Island",
    pincode: 682003,
  },

  {
    location: "Thoppumpady",
    pincode: 682005,
  },
   {
    location: "Vyttila",
    pincode: 682019,
  },
];

const selects: Option[] = [
  { value: "Rent", label: "Rent" },
  { value: "Sale", label: "Sale" },
  { value: "Lease", label: "Lease" },
];

const locationsOptions = locations.map((location) => ({
  value: `${location.location} - ${location.pincode}`,
  label: `${location.location} - ${location.pincode}`,
}));

const selectsWithOptions = [...locationsOptions];

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams;
  const searchModal = useSearchModal();

  // const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.TYPE);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [locations, setLocations] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("NightCruise");
  // Default to the first option
  const [selectType, setSelectType] = useState<Option | null>(); // Default to the first option

  const handleSelectChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      const selectedValue = selectedOption.value; // Accessing the value property directly
      // Now you can use selectedValue as needed
      console.log(selectedValue);
      setSelectType(selectedOption);
    }
  };
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      roomCount,
      bathroomCount,
    };
    if (selectedCategory) {
      updatedQuery.category = selectedCategory;
    }
    if (selectedLocation) {
      updatedQuery.location = selectedLocation.value;
    }

    if (selectType) {
      updatedQuery.type = selectType.value;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.TYPE);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    router,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const SecondaryActionLabel = useMemo(() => {
    if (step === STEPS.TYPE) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" />

      <hr />
    </div>
  );

  if (step === STEPS.TYPE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Property Search" subtitle="Property" />
        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-2
          gap-3

        "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setSelectedCategory(category)}
                selected={selectedCategory === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>

        <Select
          placeholder="Select Type"
          className="font-semibold"
          id="type"
          options={selects}
          value={selectType}
          onChange={handleSelectChange}
        />

        <Select
          placeholder="Select Location"
          id="location"
          className="font-semibold"
          options={selectsWithOptions}
          value={selectedLocation}
          onChange={(selectedOption: Option | null) =>
            setSelectedLocation(selectedOption)
          }
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find your perfect place" />

        <Counter
          title="Room"
          subtitle="How many rooms do you need"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />

        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms do you need"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={SecondaryActionLabel}
      secondaryAction={step === STEPS.TYPE ? undefined : onBack}
      body={bodyContent}
    />
  );
};
export default SearchModal;
