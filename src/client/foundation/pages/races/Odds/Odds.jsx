import React, { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { FaInfoCircle } from "../../../components/icons/FaInfoCircle";
import { Container } from "../../../components/layouts/Container";
import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TrimmedImage } from "../../../components/media/TrimmedImage";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useFetch } from "../../../hooks/useFetch";
import { Color, Radius, Space } from "../../../styles/variables";
import { formatTime } from "../../../utils/DateUtils";
import { jsonFetcher } from "../../../utils/HttpUtils";

import { OddsRankingList } from "./internal/OddsRankingList";
import { OddsTable } from "./internal/OddsTable";
import { TicketVendingModal } from "./internal/TicketVendingModal";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

const Callout = styled.aside`
  align-items: center;
  background: ${({ $closed }) =>
    $closed ? Color.mono[200] : Color.green[100]};
  color: ${({ $closed }) => ($closed ? Color.mono[600] : Color.green[500])};
  display: flex;
  font-weight: bold;
  gap: ${Space * 2}px;
  justify-content: left;
  padding: ${Space * 1}px ${Space * 2}px;
`;

/** @type {React.VFC} */
export const Odds = () => {
  const { raceId } = useParams();
  const { data, loading } = useFetch(
    `/api/races/${raceId}/no-odds`,
    jsonFetcher,
  );
  const { data: odds } = useFetch(`/api/races/${raceId}/odds`, jsonFetcher);
  const [oddsKeyToBuy, setOddsKeyToBuy] = useState(null);
  const modalRef = useRef(null);

  const handleClickOdds = useCallback(
    /**
     * @param {Model.OddsItem} odds
     */
    (odds) => {
      setOddsKeyToBuy(odds.key);
      modalRef.current?.showModal();
    },
    [],
  );

  const isRaceClosed = new Date(data?.closeAt) < new Date();

  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data?.name || ""}</Heading>
      <p>
        開始 {data ? formatTime(data.startAt) : "..."} 締切{" "}
        {data ? formatTime(data.closeAt) : "..."}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage
          height={225}
          src={data?.image.replace(".jpg", "-400x225.webp")}
          width={400}
        />
      </Section>

      <Spacer mt={Space * 2} />

      <Section>
        <TabNav>
          <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item aria-current to={`/races/${raceId}/odds`}>
            オッズ
          </TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/result`}>結果</TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 4} />

        <div style={{ minHeight: "40px" }}>
          {!loading && (
            <Callout $closed={isRaceClosed}>
              <FaInfoCircle />
              {isRaceClosed
                ? "このレースの投票は締め切られています"
                : "オッズをクリックすると拳券が購入できます"}
            </Callout>
          )}
        </div>

        <Spacer mt={Space * 4} />
        <Heading as="h2">オッズ表</Heading>

        <Spacer mt={Space * 2} />
        <div style={{ minHeight: "200px" }}>
          <OddsTable
            entries={data?.entries || []}
            isRaceClosed={isRaceClosed}
            odds={odds ?? []}
            onClickOdds={handleClickOdds}
          />
        </div>

        <Spacer mt={Space * 4} />
        <Heading as="h2">人気順</Heading>

        <Spacer mt={Space * 2} />
        <div style={{ minHeight: 64 * 20 }}>
          <OddsRankingList
            isRaceClosed={isRaceClosed}
            odds={odds ?? []}
            onClickOdds={handleClickOdds}
          />
        </div>
      </Section>

      <TicketVendingModal ref={modalRef} odds={oddsKeyToBuy} raceId={raceId} />
    </Container>
  );
};
