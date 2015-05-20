library(ggplot2)
library(ggthemes)
library(dplyr)

setwd("E:/Downloads/Courses/CUNY/SPS/Git/IS 608 Knowledge and Visual Analytics/Semester Project/Together")

agents <- read.csv("agents.csv")

MeanCVS <- agents %>%
  group_by(ActualDateDisplay, Sector, ScoreType) %>%
  summarise(DemandScore = mean(DemandScore),
            ExportScore = mean(ExportScore),
            InvestmentScore = mean(InvestmentScore),
            EmploymentScore = mean(EmploymentScore),
            TotalLabourCostsScore = mean(TotalLabourCostsScore),
            PayScore = mean(PayScore),
            PreTaxProfitsScore = mean(PreTaxProfitsScore))

MeanTotal <- agents %>%
  group_by(ActualDateDisplay, ScoreType) %>%
  summarise(DemandScore = mean(DemandScore),
            ExportScore = mean(ExportScore),
            InvestmentScore = mean(InvestmentScore),
            EmploymentScore = mean(EmploymentScore),
            TotalLabourCostsScore = mean(TotalLabourCostsScore),
            PayScore = mean(PayScore),
            PreTaxProfitsScore = mean(PreTaxProfitsScore))

MeanTotal$Sector <- as.factor("Total")

MeanCVS <- rbind(MeanCVS, MeanTotal)

write.csv(MeanCVS, "meancvs.csv", row.names=FALSE)

#########################################################################
#########################################################################
############ Agents Test ################################################
#########################################################################
#########################################################################

agentsTest <- agents %>%
  filter(ActualDateDisplay == "4/1/2011", Sector, ScoreType == "Current")

ggplot(agentsTest, aes(x=InvestmentScore)) + geom_histogram()

agentsTest <- agents %>%
  filter(ActualDateDisplay == "4/1/2008", ScoreType == "Current") %>%
  group_by(DemandScore) %>%
  summarize(AvgEmpScore = mean(EmploymentScore), Count = n())

ggplot(agentsTest, aes(x=DemandScore, y=AvgEmpScore, size=Count)) + geom_point()
