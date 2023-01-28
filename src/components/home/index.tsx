import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import FormSelect from 'react-bootstrap/FormSelect';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import { fetchApi } from '@/utils/fetchApi';
import { parseDate } from '@/utils/date';

export default function Home() {
  const [viewMode, setViewMode] = useState<string>('card');
  const [direction, setDirection] = useState<string>('asc');
  // facebook | M-Husein
  // https://api.github.com/users/facebook/repos?per_page=12 | /dummy/repos.json
  const { data, error, isLoading } = useSWR(`/dummy/repos.json?direction=${direction}`, fetchApi);
  // console.log('data: ', data);

  const renderCreatedAt = (date: string, prefix?: string) => (
    date && <time dateTime={date} className="small">{prefix}{parseDate(date)}</time>
  );

  const renderActions = (item: any) => (
    <>
      <Link href={`/detail/${item.owner.login}/${item.name}`}>
        <Button as="span" tabIndex={-1} size="sm" variant="outline-primary">Detail</Button>
      </Link>
      {' '}
      <Button
        as="a"
        href={item.svn_url}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
      >
        Repository
      </Button>
    </>
  )

  return (
    <>
      {error || data?.message && (
        <Alert variant="danger">{data?.message}</Alert>
      )}

      {Array.isArray(data) ?
        data.length ?
          <>
            <div className="d-flex flex-wrap row-gap-3 align-items-center py-3">
              {data[0].owner.avatar_url && (
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={data[0].owner.avatar_url}
                      alt={data[0].owner.login}
                      width={50}
                      height={50}
                      className="img-thumbnail"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    {data[0].owner.login}
                  </div>
                </div>
              )}

              <div className="d-flex align-items-center ms-sm-auto">
                <FormSelect
                  size="sm"
                  className="cursor-pointer"
                  disabled={isLoading}
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </FormSelect>

                <div className="flex-none small ms-3">
                  View as:{' '}
                  <ButtonGroup size="sm">
                    {['card', 'table'].map((view: string) =>
                      <ToggleButton
                        key={view}
                        id={`${view}ViewMode`}
                        type="radio"
                        variant="outline-primary"
                        name="viewMode"
                        className="text-capitalize"
                        disabled={isLoading}
                        value={view}
                        checked={viewMode === view}
                        onChange={() => setViewMode(view)}
                      >
                        {view}
                      </ToggleButton>
                    )}
                  </ButtonGroup>
                </div>
              </div>
            </div>

            {viewMode === 'card' ?
              <div className="row row-gap-4">
                {data.map((item: any) => 
                  <div key={item.id} className="col-md-3">
                    <Card className="h-100 shadow-sm">
                      <Card.Body className="d-flex flex-column align-items-baseline">
                        <Card.Title>
                          <Link href={`/detail/${item.owner.login}/${item.name}`} className="text-decoration-none link-dark">{item.name}</Link>
                        </Card.Title>
                        <Card.Text className="line-clamp">
                          {item.description}
                        </Card.Text>

                        <Card.Text>
                          {renderCreatedAt(item.created_at, 'Created at ')}
                        </Card.Text>

                        <div className="mt-auto">
                          {renderActions(item)}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>             
                )}
              </div>
              :
              <Table striped bordered hover responsive size="sm">
                <colgroup>
                  <col width="50" />
                  <col />
                  <col />
                  <col width="160" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Created at</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, idx: number) =>
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <Link href={`/detail/${item.owner.login}/${item.name}`} className="text-decoration-none link-dark">{item.name}</Link>
                      </td>
                      <td>
                        {renderCreatedAt(item.created_at)}
                      </td>
                      <td>
                        {renderActions(item)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            }
          </>
          :
          <div>No have repositories</div>
        :
        isLoading && (
          <div className="row row-gap-4">
            {Array.from({ length: 12 }).map((v: any, idx: number) =>
              <div key={idx} className="col-md-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="placeholder-glow">
                      <span className="placeholder col-6" />
                    </Card.Title>
                    <Card.Text className="placeholder-glow">
                      <span className="placeholder col-9" />
                    </Card.Text>
                    <div className="mt-auto">
                      <Button disabled size="sm" variant="outline-primary" className="placeholder col-3" />{' '}
                      <Button disabled size="sm" className="placeholder col-4" />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        )
      }

      {/* {Array.from({ length: 30 }).map((v: any, idx: number) => <p key={idx}>Dummy {idx + 1}</p>)} */}
    </>
  )
}
