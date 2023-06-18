"use client";

import { useEffect, useState } from 'react';
import DropdownIcon from '@assets/svg/register/dropdown.svg';
import { hangjungdong } from "@src/constants/hangjungdong";
import styles from './styles.module.scss';
import Typo from '@components/core/Typo';

interface AddressDropdownDogInfo {
  pageTitle: string;
  addrTextReturn?: ((text1: string, text2: string) => void) | ((text1: string, text2: string, text3: string) => void);
}

export default function AddressDropdown(props: AddressDropdownDogInfo) {
  const { pageTitle, addrTextReturn } = props;

  const [isSidoOpen, setIsSidoOpen] = useState(false);
  const [isSigugunOpen, setIsSigugunOpen] = useState(false);
  const [isDongOpen, setIsDongOpen] = useState(false);


  const { sido, sigugun, dong } = hangjungdong;
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [addr3, setAddr3] = useState("");

  // console.log(addrDogInfo?.sex)

  useEffect(() => {
    if (pageTitle !== "inputDog" && addrTextReturn) {
      addrTextReturn(addr1, addr2);
    } else if (pageTitle === "inputDog" && addrTextReturn) {
      addrTextReturn(addr1, addr2, addr3);
    }
  }, [pageTitle, addrTextReturn, addr1, addr2, addr3])

  useEffect(() => {console.log('addrrrrr', addr1, addr2, addr3)}, [addr1, addr2, addr3]);

  return (
    <>
      <div className={styles.addrDropdownWrapper}>
        <div className={styles.sidoSection}>
          <div className={styles.addrBox} onClick={() => { setIsSidoOpen(true); setAddr2(""); setAddr3(""); }}>
            <Typo color="black" variant="caption" className={styles.inputAddr}>{addr1}</Typo>
            <DropdownIcon className={styles.dropdownIcon} />
          </div>
          {
            isSidoOpen
              ?
              <>
                <div className={styles.addressDropdown}>
                  <>
                    {sido.map((e) => {
                      return (
                        <div className={styles.dropdownEl} onClick={() => { setIsSidoOpen(false); setVal1(e.sido); setAddr1(e.codeNm) }} key={e.sido}>
                          <Typo color="black" variant="caption">{e.codeNm}</Typo>
                        </div>
                      )
                    })}
                  </>
                </div>
              </>
              : null
          }
        </div>

        <div className={styles.sigugunSection}>
          <div className={styles.addrBox} onClick={() => { setIsSigugunOpen(true); setAddr3(""); }}>
            <Typo color="black" variant="caption" className={styles.inputAddr}>{addr2}</Typo>
            <DropdownIcon className={styles.dropdownIcon} />
          </div>
          {
            isSigugunOpen
              ?
              <>
                <div className={styles.addressDropdown}>
                  {sigugun
                    .filter((e) => e.sido === val1)
                    .map((e) => {
                      return (
                        <div className={styles.dropdownEl} onClick={() => { setIsSigugunOpen(false); setVal2(e.sigugun); setAddr2(e.codeNm) }} key={e.sigugun}>
                          <Typo color="black" variant="caption">{e.codeNm}</Typo>
                        </div>
                      )
                    })}
                </div>
              </>
              : null
          }
        </div>

        {
          pageTitle === "inputDog"
            ?
            <>
              <div className={styles.dongSection}>
                <div className={styles.addrBox} onClick={() => setIsDongOpen(true)}>
                  <Typo color="black" variant="caption" className={styles.inputAddr}>{addr3}</Typo>
                  <DropdownIcon className={styles.dropdownIcon} />
                </div>
                {
                  isDongOpen
                    ?
                    <>
                      <div className={styles.addressDropdown}>
                        {dong
                          .filter((e) => e.sido === val1 && e.sigugun === val2)
                          .map((e) => {
                            return (
                              <div className={styles.dropdownEl} onClick={() => { setIsDongOpen(false); setVal3(e.dong); setAddr3(e.codeNm) }} key={e.dong}>
                                <Typo color="black" variant="caption">{e.codeNm}</Typo>
                              </div>
                            )
                          })}
                      </div>
                    </>
                    : null
                }
              </div>
            </>
            : null
        }
      </div>

      {
        //input 페이지에서 사용할 경우
        pageTitle === "inputDog"
          ?
          <>
            <input type="hidden" name="dog_lostAddr1" value={addr1} />
            <input type="hidden" name="dog_lostAddr2" value={addr2} />
            <input type="hidden" name="dog_lostAddr3" value={addr3} />
          </>

          //lostDogList 페이지에서 사용할 경우
          : null
      }
    </>
  )
}