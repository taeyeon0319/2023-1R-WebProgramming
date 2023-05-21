import React, { useEffect } from 'react'
import { useState } from 'react';
import './Worldcup.css';

function Worldcup() {
    const candidate = [
        { name: '빠삐코', src: "https://img.danawa.com/prod_img/500000/291/539/img/3539291_1.jpg?shrink=330:*&_v=20180508105511" },
        { name: '투게더', src: "https://img.danawa.com/prod_img/500000/810/538/img/3538810_1.jpg?shrink=330:*&_v=20180419145316" },
        { name: '엑설런트', src: "https://img.danawa.com/prod_img/500000/198/108/img/5108198_1.jpg?shrink=330:*&_v=20220718151054" },
        { name: '월드콘', src: "https://img.danawa.com/prod_img/500000/496/100/img/8100496_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '붕어싸만코', src: "https://img.danawa.com/prod_img/500000/843/872/img/18872843_1.jpg?shrink=330:*&_v=20230130170343" },
        { name: '구구크러스터', src: "https://img.danawa.com/prod_img/500000/748/084/img/4084748_1.jpg?shrink=330:*&_v=20180323120243" },
        { name: '빵또아', src: "https://img.danawa.com/prod_img/500000/631/116/img/5116631_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '폴라포', src: "https://img.danawa.com/prod_img/500000/773/119/img/5119773_1.jpg?shrink=330:*&_v=20200417144309" },
        { name: '스크류바', src: "https://img.danawa.com/prod_img/500000/506/001/img/6001506_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '허쉬초코바', src: "https://img.danawa.com/prod_img/500000/732/609/img/14609732_1.jpg?shrink=330:*&_v=20210629131302" },
        { name: '바밤바', src: "https://img.danawa.com/prod_img/500000/771/376/img/5376771_1.jpg?shrink=330:*&_v=20190514173806" },
        { name: '비비빅', src: "https://img.danawa.com/prod_img/500000/277/923/img/7923277_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '배뱀배', src: "https://img.danawa.com/prod_img/500000/572/190/img/17190572_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '더위사냥', src: "https://img.danawa.com/prod_img/500000/470/120/img/5120470_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '쿠앤크', src: "https://img.danawa.com/prod_img/500000/067/343/img/5343067_1.jpg?shrink=330:*&_v=20220727164743" },
        { name: '옥동자', src: "https://img.danawa.com/prod_img/500000/819/344/img/5344819_1.jpg?shrink=330:*&_v=20220727164743" },
    ]

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [stat, setStat] = useState({
        "빠삐코": 0,
        "투게더": 0,
        "엑설런트": 0,
        "월드콘": 0,
        "붕어싸만코": 0,
        "구구크러스터": 0,
        "빵또아": 0,
        "폴라포": 0,
        "스크류바": 0,
        "허쉬초코바": 0,
        "바밤바": 0,
        "비비빅": 0,
        "배뱀배": 0,
        "더위사냥": 0,
        "쿠앤크": 0,
        "옥동자": 0,

    })

    useEffect(() => {
        let timer;

        if (selectedItem) {
            timer = setTimeout(() => {
                console.log(`Selected item: ${selectedItem.name}`);
                setSelectedItem(null);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [selectedItem]);

    //처음 worldcup 컴포넌트가 단 한 번 실행하는 함수
    useEffect(() => {
        const 문자열 = localStorage.getItem("2020112107");
        if (문자열 != null) {
            setStat(JSON.parse(문자열));
        }
        setGame(
            candidate.map((c) => {
                return { name: c.name, src: c.src, order: Math.random() };
            }).sort((l, r) => {
                return l.order - r.order;
            })
        );
    }, []);

    useEffect(() => {
        console.log(game.length)
        if (game.length > 1 && round + 1 > game.length / 2) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }
    }, [round]);

    if (selectedItem) {
        return (
            <div className="worldcup-title">
                <p className='choose'>선택된 아이템:</p>
                <img src={selectedItem.src} alt={selectedItem.name} />
                <p className="worldcup-item-title">{selectedItem.name}</p>
            </div>
        );
    }

    if (game.length === 1) {
        localStorage.setItem("2020112107", JSON.stringify(stat));
    
        // Object.keys(stat)를 사용하여 키 배열을 가져온 후, 정렬합니다.
        const sortedKeys = Object.keys(stat).sort((a, b) => stat[b] - stat[a]);
    
        return (
            <div className="worldcup-title">
                <p>아이슈쿠뤼임 월드컵 우승!!!!!!!!</p>
                <img src={game[0].src} alt={game[0].name} />
                <p>{game[0].name} {stat[game[0].name]}번 승리</p>
                <p>**아이슈쿠뤼임 월드컵 순위**</p>
                <center>
                    <table>
                    {sortedKeys.map(name => {
                        return <tr key={name}><td>{name}</td><td>{stat[name]}</td></tr>
                    })}
                </table>
                </center>
                
            </div>
        );
    }
    

    if (game.length === 0 || round + 1 > game.length / 2) {
        return <p>로딩중입니다.</p>;
    }
    const left = round * 2, right = round * 2 + 1;

    console.log(stat);

    // 왜 두번씩 출력이 되는건가? ==> 
    const leftFunction = () => {
        // 통계를 내자...!
        console.log('left function')
        if (game.length === 2) {
            setStat({
                ...stat, //
                [game[left].name]: stat[game[left].name] + 1
            })
        }
        setNextGame((prev) => prev.concat(game[left]));
        setSelectedItem(game[left]);
        setRound(round => round + 1);
    }

    const rightFunction = () => {
        console.log('right function')
        if (game.length === 2) {
            setStat({
                ...stat, //
                [game[right].name]: stat[game[right].name] + 1
            })
        }
        setNextGame((prev) => prev.concat(game[right]));
        setSelectedItem(game[right]);
        setRound(round => round + 1);
    }
    return (
        <div className="worldcup-container">
            <div className="worldcup-title">
                <p>
                    아이슈쿠뤼임 월드컵 {round + 1} / {game.length / 2}{' '}
                    <b>{game.length === 2 ? '결승' : game.length + '강'}</b>
                </p>
            </div>
            <div>
                <div className="worldcup-items">
                    <div className="worldcup-item">
                        <img src={game[left].src} alt={game[left].name} onClick={leftFunction} />
                        <div className="worldcup-item-title">
                            <p style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                                {game[left].name}
                            </p>
                        </div>
                    </div>
                    <div className="worldcup-item">
                        <img src={game[right].src} alt={game[right].name} onClick={rightFunction} />
                        <div className="worldcup-item-title">
                            <p style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                                {game[right].name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Worldcup;