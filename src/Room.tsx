import React, { createRef, useEffect, useState } from 'react';
import { database } from 'firebase';
import firebaseApp from './firebase';
import { useParams } from 'react-router-dom';


type cc = Map<string, any>;

interface RoomRouteParam {
    id?: string
};

const Room = () => {

    let db1 = database(firebaseApp.app());

    const inputRef = createRef<HTMLInputElement>();

    const params : RoomRouteParam = useParams();

    const [roomName, setRoomName] = useState<string>('');
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const [players, setPlayers] = useState<Array<any>>([]);

    let app = firebaseApp;
    // database

    const refURL = `https://hilihao-65f1d.firebaseio.com/${params.id}`;
    const playerURL = `${refURL}/players`;

    let join = async () => {
        let name = inputRef.current?.value
        let db = await db1.
            refFromURL(playerURL).
            push({
                name,
                vote: 0,
            });
        
        await db.onDisconnect().remove();
        setIsJoined(true);

        db1.refFromURL(refURL).once('value', (c) => {
            let v = c.val();
            setRoomName(v.name);
        })
    }

    useEffect(() => {

        const handler = (c: database.DataSnapshot) => {
            let val = c.val();
            let arr : Array<any> = [];
            for (const property in val) {
                let b = val[property];
                let newObj = Object.assign({}, b, {id: property});
                arr.push(newObj);
            }
            setPlayers(arr);
        }
        const unsubscribe = db1.refFromURL(playerURL).on('value', handler);

        return () => {
            // unsubscribe();
        }
    }, [])

    // let arr : Array<any> = [];

    // if (players) {
    //     arr = Array.from(Object.keys(players))
    //     console.log(arr);
    // }

    // const PlayerSection = () => {
    //     return (
    //         <div>
    //             {arr.map((x) => (
    //                 <p key={x}>{players.get(x).name}</p>
    //             ))}
    //         </div>
    //     );
    // };

    // console.log('remder', arr);

    return(
        <>
            {!isJoined ? (
                <div>
                    Join Room
                    <input ref={inputRef} placeholder="Saya adalah ?" />
                    <select>
                        <option>Join as Player</option>
                        <option>Join as Observer</option>
                    </select>

                    <button onClick={join}>Join</button>
                </div>
            ) : null}

            <h1>Room : {roomName}</h1>

            {/* <PlayerSection /> */}
            {players.map((x: any) => (
                <p key={x.id}>{x.name}</p>
            ))}
        </>
    );
};

export default Room;
