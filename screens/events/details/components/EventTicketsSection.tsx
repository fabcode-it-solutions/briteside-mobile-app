import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from "@/components";
import { useTheme } from "@/theme";
import type { EventTicketTier } from "@/screens/events/types";

type TicketCardProps = {
  ticket: EventTicketTier;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket, quantity, onIncrement, onDecrement }) => {
  const theme = useTheme();

  return (
    <View style={[styles.ticketCard, { borderColor: theme.colors.border }]}>
      <View style={styles.ticketHeader}>
        <View style={styles.ticketTitleBlock}>
          <ThemeText variant="overline" style={{ color: theme.colors.text.primary }}>
            {ticket.title}{" "}
            <ThemeText
              variant="meta2"
              style={{
                fontWeight: "500",
                color: theme.colors.primary.main,
              }}
            >
              {ticket.price}{" "}
            </ThemeText>
            <ThemeText variant="meta2" style={{ color: theme.colors.text.secondary }}>
              {ticket.feeLabel}
            </ThemeText>
          </ThemeText>
          <ThemeText
            variant="overline"
            style={{
              fontWeight: "700",
              color: theme.colors.text.secondary,
            }}
          >
            {ticket.description}
          </ThemeText>
        </View>
        <View style={styles.priceBlock}>
          <View style={[styles.stepper, { borderColor: theme.colors.border }]}>
            <StepperButton icon="remove" onPress={onDecrement} disabled={quantity === 0} />
            <ThemeText
              variant="overline"
              style={[styles.quantityValue, { color: theme.colors.text.primary }]}
            >
              {quantity}
            </ThemeText>
            <StepperButton icon="add" onPress={onIncrement} />
          </View>
        </View>
      </View>

      <View style={styles.perksRow}>
        {ticket.perks.map((perk) => (
          <View
            key={perk}
            style={[
              styles.perkPill,
              {
                borderColor: theme.colors.border,
                borderWidth: 1,
              },
            ]}
          >
            <ThemeText variant="tagStyle500" style={{ color: theme.colors.text.secondary }}>
              {perk}
            </ThemeText>
          </View>
        ))}
      </View>
    </View>
  );
};

type StepperButtonProps = {
  icon: "add" | "remove";
  onPress: () => void;
  disabled?: boolean;
};

const StepperButton: React.FC<StepperButtonProps> = ({ icon, onPress, disabled }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.stepperButton,
        {
          backgroundColor: disabled ? theme.colors.gray[200] : theme.colors.background.paper,
        },
      ]}
    >
      <Ionicons
        name={icon === "add" ? "add" : "remove"}
        size={10}
        color={disabled ? theme.colors.text.disabled : theme.colors.text.primary}
      />
    </TouchableOpacity>
  );
};

type EventTicketsSectionProps = {
  tickets: EventTicketTier[];
};

export const EventTicketsSection: React.FC<EventTicketsSectionProps> = ({ tickets }) => {
  const theme = useTheme();
  const initialQuantities = useMemo(
    () => tickets.reduce<Record<string, number>>((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {}),
    [tickets],
  );
  const [quantities, setQuantities] = useState(initialQuantities);

  const handleAdjustQuantity = (ticketId: string, delta: 1 | -1) => {
    setQuantities((prev) => {
      const current = prev[ticketId] ?? 0;
      const next = Math.max(0, current + delta);
      if (next === current) return prev;
      return { ...prev, [ticketId]: next };
    });
  };

  return (
    <View
      style={[
        styles.sectionCard,
        {
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background.paper,
        },
      ]}
    >
      <ThemeText
        variant="caption2"
        style={[styles.sectionHeading, { color: theme.colors.text.primary }]}
      >
        Get Your Tickets
      </ThemeText>

      <View style={styles.ticketsList}>
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            quantity={quantities[ticket.id] ?? 0}
            onIncrement={() => handleAdjustQuantity(ticket.id, 1)}
            onDecrement={() => handleAdjustQuantity(ticket.id, -1)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    gap: 16,
  },
  sectionHeading: {
    fontWeight: "600",
  },
  ticketsList: {
    gap: 16,
  },
  ticketCard: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 18,
    gap: 12,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  ticketTitleBlock: {
    flex: 1,
    gap: 6,
  },
  priceBlock: {
    alignItems: "flex-end",
    gap: 4,
  },
  perksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  perkPill: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 999,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  stepperButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    width: 20,
    textAlign: "center",
  },
});
