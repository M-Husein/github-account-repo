import { type ReactElement } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useRouter } from 'next/router';
import { fetchApi } from '@/utils/fetchApi';
import { parseDate } from '@/utils/date';
import { numShort } from '@/utils/numShort';
import LayoutMain from '@/components/layout';

const Page = () => {
  const router = useRouter();
  const {owner, repoName} = router.query;
  // https://api.github.com/repos/${owner}/${repoName} | /dummy/detail.json
  const { data, error, isLoading } = useSWR(`/dummy/detail.json`, fetchApi);
  console.log('data: ', data);
  console.log('router: ', router);

  const renderTime = (date: string, prefix?: string) => (
    date && <time dateTime={date}>{prefix}{parseDate(date)}</time>
  );

  return (
    <main className="container py-3">
      {isLoading ?
        <div>Loading</div>
        :
        error || data?.message ? 
          <Alert variant="danger">{data?.message}</Alert>
          :
          <>
            <div className="d-flex align-items-center mb-3">
              <div className="flex-shrink-0">
                <Image
                  src={data.owner.avatar_url}
                  alt={owner as string || 'owner'}
                  width={50}
                  height={50}
                  className="img-thumbnail"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                {owner}
              </div>
            </div>

            <h5>{repoName}</h5>
            <p className="lead">{data.description}</p>

            <dl className="row gx-0 small">
              <dt className="col-sm-2">Created at</dt>
              <dd className="col-sm-10">{renderTime(data.created_at)}</dd>

              {data.updated_at && (
                <>
                  <dt className="col-sm-2">Updated at</dt>
                  <dd className="col-sm-10">{renderTime(data.updated_at)}</dd>
                </>
              )}

              {data.language && (
                <>
                  <dt className="col-sm-2">Language</dt>
                  <dd className="col-sm-10">{data.language}</dd>
                </>
              )}
              
              {data?.license?.name && (
                <>
                  <dt className="col-sm-2">License</dt>
                  <dd className="col-sm-10">{data.license.name}</dd>
                </>
              )}

              {Array.isArray(data.topics) && (
                <>
                  <dt className="col-sm-2">Topics</dt>
                  <dd className="col-sm-10 d-flex flex-wrap gap-1">
                    {data.topics.map((item: string) => <Badge key={item} as="a" href={`https://github.com/topics/${item}`} pill bg="info" target="_blank" rel="noopener noreferrer" className="text-decoration-none">{item}</Badge>)}
                  </dd>
                </>
              )}
            </dl>
            

            <div className="d-flex flex-wrap gap-2">
              {data.homepage && (
                <Button size="sm" as="a" href={data.homepage} target="_blank" rel="noopener noreferrer">Homepage</Button>
              )}

              <Button size="sm" as="a" href={data.svn_url} target="_blank" rel="noopener noreferrer">Repository</Button>
              
              <Button disabled size="sm" variant="outline-primary" className="pe-auto opacity-100 cursor-auto">
                Watch <Badge>{data.watchers_count ? numShort(data.watchers_count) : 0}</Badge>
              </Button>
              <Button disabled size="sm" variant="outline-primary" className="pe-auto opacity-100 cursor-auto">
                Fork <Badge>{data.forks_count ? numShort(data.forks_count) : 0}</Badge>
              </Button>
              <Button disabled size="sm" variant="outline-primary" className="pe-auto opacity-100 cursor-auto">
                Starred <Badge>{data.stargazers_count ? numShort(data.stargazers_count) : 0}</Badge>
              </Button>
              <Button disabled size="sm" variant="outline-primary" className="pe-auto opacity-100 cursor-auto">
                Issues <Badge>{data.open_issues_count ? numShort(data.open_issues_count) : 0}</Badge>
              </Button>
            </div>
          </>
      }
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutMain title="Detail">
      {page}
    </LayoutMain>
  )
}

export default Page;
