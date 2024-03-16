'use client'
import React from 'react'
import axios from 'axios'
const API_URL = process.env.API_URL ?? 'http://localhost:8080'

interface Table {
  reservationPerson: string[]
  status: string[]
}

interface Reserve {
  _id: string
  Date: Date
  ReservationList: string[]
  Tables: Table[]
}

export default function Page() {
  const [reserve, setReserve] = React.useState<Reserve[]>([])
  React.useEffect(() => {
    const getReserve = async () => {
      const res = await axios.get(`${API_URL}/reserve`)
      console.log(res.data)
      setReserve(res.data)
    }
    getReserve()
  }, [])
  const getPersonInfo = async (_id: string) => {
    const res = await axios.get(`${API_URL}/su/get-person?_id=${_id}`)
    //console.log(res.data)
    return [res.data.email, res.data.phone]
  }

  return (
    <div>
      <h1>Page</h1>
      {reserve &&
        reserve.map((r) => (
          <>
            <div key={r._id}>
              {new Date(r.Date).toLocaleDateString()}
              <div className="flex">
                {r.Tables.map((_t, tIndex) => (
                  <table
                    className={
                      tIndex === 0
                        ? 'w-1/4 text-left text-sm font-light'
                        : 'w-1/6 text-left text-sm font-light'
                    }
                    key={tIndex}
                  >
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        {tIndex === 0 && (
                          <th scope="col" className="px-6 py-4"></th>
                        )}
                        <th scope="col" className="px-6 py-4">
                          Table {tIndex + 1}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {_t.reservationPerson.map((_p, pIndex) => {
                        //let test: string = 'abjepoab '
                        let username: string | undefined = ''
                        let phone: string | undefined = ''
                        if (_p != null) {
                          //[username,phone] = getPersonInfo(_p)
                          getPersonInfo(_p).then((res) => {
                            console.log(res)
                            username = res[0]
                            phone = res[1]
                            //console.log(username, phone)
                          })
                        }
                        return (
                          <tr
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                            key={pIndex}
                          >
                            {tIndex === 0 && (
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {10 + pIndex}:00~{11 + pIndex}:00
                              </td>
                            )}
                            <td className="whitespace-nowrap px-6 py-4">
                              {_p != null ? (
                                <p>
                                  reservation person:{' '}
                                  {username && username.length > 5 ? (
                                    <br />
                                  ) : null}
                                  {username}
                                  <p>phone: {phone}</p>
                                </p>
                              ) : (
                                <br />
                              )}
                              <p>
                                status:{' '}
                                <span
                                  style={{
                                    color:
                                      _t.status[pIndex] === 'available'
                                        ? '#00d400'
                                        : '#000',
                                  }}
                                >
                                  {_t.status[pIndex]}
                                </span>
                              </p>
                              {_p == null && (
                                <>
                                  <br />
                                  {username && username.length > 5 ? (
                                    <br />
                                  ) : null}
                                </>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
            <br />
            <br />
          </>
        ))}
    </div>
  )
}
