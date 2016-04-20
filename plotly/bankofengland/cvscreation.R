setwd('/Users/Charley/Downloads/charleyferrari.github.io/plotly/bankofengland')

agents <- read.csv('agents.csv')

unique(agents$Sector)

library(dplyr)

meancvs <- agents %>%
  filter(ScoreType == 'Current') %>%
  group_by(ActualDateDisplay) %>%
  summarize(DemandScore = mean(DemandScore))

meancvs <- agents %>%
  group_by(ActualDateDisplay, Sector, ScoreType) %>%
  summarize(DemandScore = mean(DemandScore),
            ExportScore = mean(ExportScore),
            InvestmentScore = mean(InvestmentScore),
            EmploymentScore = mean(EmploymentScore),
            TotalLabourCostsScore = mean(TotalLabourCostsScore),
            PayScore = mean(PayScore),
            PreTaxProfitsScore = mean(PreTaxProfitsScore))

meancvstotal <- agents %>%
  group_by(ActualDateDisplay, ScoreType) %>%
  summarize(DemandScore = mean(DemandScore),
            ExportScore = mean(ExportScore),
            InvestmentScore = mean(InvestmentScore),
            EmploymentScore = mean(EmploymentScore),
            TotalLabourCostsScore = mean(TotalLabourCostsScore),
            PayScore = mean(PayScore),
            PreTaxProfitsScore = mean(PreTaxProfitsScore))
meancvstotal$Sector <- 'Total'

meancvs <- rbind(meancvs, meancvstotal)

## Order by date
datetable <- data.frame(ActualDateDisplay = levels(meancvs$ActualDateDisplay),
                        order = c(1,5,9,13,17,21, 2,6,10,14,18,22,
                                  3,7,11,15,19,23, 4,8,12,16,20,24))

meancvs <- merge(meancvs, datetable, by="ActualDateDisplay")
meancvs <- meancvs %>%
  arrange(order) %>%
  select(-order)

meancvs$ActualDateDisplay <- c(as.POSIXct(strptime('1/1/2008', '%m/%d/%Y')),
  as.POSIXct(strptime('1/1/2009', '%m/%d/%Y')),
  as.POSIXct(strptime('1/1/2010', '%m/%d/%Y')),
  as.POSIXct(strptime('1/1/2011', '%m/%d/%Y')),
  as.POSIXct(strptime('1/1/2012', '%m/%d/%Y')),
  as.POSIXct(strptime('1/1/2013', '%m/%d/%Y')),
  as.POSIXct(strptime('4/1/2008', '%m/%d/%Y')),
  as.POSIXct(strptime('4/1/2009', '%m/%d/%Y')),
  as.POSIXct(strptime('4/1/2010', '%m/%d/%Y')),
  as.POSIXct(strptime('4/1/2011', '%m/%d/%Y')),
  as.POSIXct(strptime('4/1/2012', '%m/%d/%Y')),
  as.POSIXct(strptime('4/1/2013', '%m/%d/%Y')),
  as.POSIXct(strptime('7/1/2008', '%m/%d/%Y')),
  as.POSIXct(strptime('7/1/2009', '%m/%d/%Y')),
  as.POSIXct(strptime('7/1/2010', '%m/%d/%Y')),
  as.POSIXct(strptime('7/1/2011', '%m/%d/%Y')),
  as.POSIXct(strptime('7/1/2012', '%m/%d/%Y')),
  as.POSIXct(strptime('7/1/2013', '%m/%d/%Y')),
  as.POSIXct(strptime('10/1/2008', '%m/%d/%Y')),
  as.POSIXct(strptime('10/1/2009', '%m/%d/%Y')),
  as.POSIXct(strptime('10/1/2010', '%m/%d/%Y')),
  as.POSIXct(strptime('10/1/2011', '%m/%d/%Y')),
  as.POSIXct(strptime('10/1/2012', '%m/%d/%Y')),
  as.POSIXct(strptime('10/1/2013', '%m/%d/%Y')))

meancvs <- meancvs[order(meancvs$ActualDateDisplay),]
write.csv(meancvs, 'meancvsplotly.csv', row.names=FALSE)

write.csv(meancvs, 'meancvs.csv', row.names=FALSE)
